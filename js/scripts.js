const spans = document.querySelectorAll("h1 span");
console.log(spans);
spans.forEach((span) =>
    span.addEventListener("mouseover", function(e) {
        span.classList.add("animated", "rubberBand");
    })
);
spans.forEach((span) =>
    span.addEventListener("mouseout", function(e) {
        span.classList.remove("animated", "rubberBand");
    })
);

// skills sphere
const canvas = document.getElementById("canvas");

const texts = [
    "HTML5",
    "Javascript",
    "Scala",
    "Kotlin",
    "Erlang",
    "CSS",
    "Python",
    "Java",
    "PostgreSQL",
    "MongoDB",
    "Android",
    "TensorFlow",
    "Flask",
    "React",
    "Redis",
    "NodeJS",
    "OCaml",
    "Redux",
    "Rx",
];
const counts = [1, 2, 4, 5, 4, 2, 1];

const options = {
    tilt: Math.PI / 9,
    initialVelocityX: 0.09,
    initialVelocityY: 0.09,
    initialRotationX: Math.PI * 0.14,
    initialRotationZ: 0,
};

wordSphere(canvas, texts, counts, options);

/**
 * WordSphere
 * Written by Hyojun Kim in 2017. Licensed in MIT.
 */
function wordSphere(canvas, texts, counts, options) {
    const π = Math.PI; // happy math!
    const {
        width = 700,
            height = 700,
            radius = 250,
            padding = 0,
            fontSize = 25,
            tilt = 0,
            initialVelocityX = 0,
            initialVelocityY = 0,
            initialRotationX = 0,
            initialRotationZ = 0,
    } = options;

    let vx = initialVelocityX,
        vy = initialVelocityY;
    let rx = initialRotationX,
        rz = initialRotationZ;

    // canvas setup
    let ctx = canvas.getContext("2d");
    ctx.textAlign = "right";

    // Hi-DPI support
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(2, 2);

    // scrolling
    let clicked = false,
        lastX,
        lastY;
    canvas.addEventListener("mouseover", (event) => {
        clicked = true;
        lastX = event.screenX;
        lastY = event.screenY;
    });
    canvas.addEventListener("mousemove", (event) => {
        if (!clicked) return;
        [dx, dy] = [event.screenX - lastX, event.screenY - lastY];
        [lastX, lastY] = [event.screenX, event.screenY];

        // rotation update
        rz += -dy * 0.01;
        rx += dx * 0.01;

        //     // velocity update
        //     vx = dx * 0.1;
        //     vy = dy * 0.1;

        if (!looping) startLoop();
    });
    //   canvas.addEventListener('mouseup', e => clicked = false);
    //   canvas.addEventListener('mouseleave', e => clicked = false);

    function rot(x, y, t) {
        return [
            x * Math.cos(t) - y * Math.sin(t),
            x * Math.sin(t) + y * Math.cos(t),
        ];
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let ix = 0,
            iz = 0,
            i = 1;
        for (const text of texts) {
            const degZ = (π / (counts.length - 1)) * iz;
            const degX = ((2 * π) / counts[iz]) * ix;

            let x = radius * Math.sin(degZ) * Math.cos(degX);
            let y = radius * Math.sin(degZ) * Math.sin(degX);
            let z = radius * Math.cos(degZ) + 8 * (ix % 2); /* randomness */

            // camera transform
            [y, z] = rot(y, z, tilt);
            [x, z] = rot(x, z, rz);
            [x, y] = rot(x, y, rx);

            // convert to cartesian and then draw.
            const alpha = 0.6 + 0.4 * (x / radius);
            const size = fontSize + 2 + 5 * (x / radius);
            ctx.fillStyle = `rgba(21,243,243,${alpha})`;
            ctx.font = `${size}px "Indie Flower", cursive`;
            ctx.fillText(text, y + width / 2, -z + height / 2);

            ix--;
            if (ix < 0) {
                iz++;
                ix = counts[iz] - 1;
            }
            i++;
        }
    }

    // renderer
    let looping = false;

    function rendererLoop() {
        if (looping) window.requestAnimationFrame(rendererLoop);
        render();

        // deacceleration - dirty code xD
        if (vx > 0) vx = vx - 0.01;
        if (vy > 0) vy = vy - 0.01;
        if (vx < 0) vx = vx + 0.01;
        if (vy > 0) vy = vy + 0.01;
        if (vx == 0 && vy == 0) stopLoop();

        rz += vy * 0.01;
        rx += vx * 0.01;
    }

    function startLoop() {
        looping = true;
        window.requestAnimationFrame(rendererLoop);
    }

    function stopLoop() {
        looping = false;
    }
    startLoop();
}

// end sphere

// ParticlesJS Config.
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 700,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000",
            },
            polygon: {
                nb_sides: 5,
            },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 0.1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 10,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab",
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true,
});

// filter work
$(function() {
    $(".grid").isotope({
        itemSelector: ".grid-item",
    });

    let preDiv
        // filter items on button click
    $(".filter-button-group").on("click", "li", function() {
        var filterValue = $(this).attr("data-filter");
        $(".grid").isotope({
            filter: filterValue,
        });
        // $(".filter-button-group li").removeClass("active");
        // $(this).addClass("active");
    });
});

$('.filter-button-group').each(function(i, filterGroup) {
    var $filterGroup = $(filterGroup);
    $filterGroup.on('click', 'li', function() {
        $filterGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});