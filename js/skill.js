$(document).ready(function() {
    $('.skill').each(function() {
        var count = 0;
        var self = $(this);
        var percent = parseInt(self.data('percent'));
        self.children().eq(2).animate({
            height: percent + '%'
        }, 1000, "linear");
        var persentChange = setInterval(function() {

            if (count <= percent) {
                self.children().eq(0).text(count + '%');
            }
            count++;
        }, 1000 / percent);
    });
});