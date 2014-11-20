$.ajax({
    type: 'GET',
    url: 'http://levi.cis.indwes.edu:8080/chapel',
    dataType: 'xml',
    success: function (data) {

        $(data).find('root').each(function () {
            for (var i = 0; i < 3; i++) {
                $(data).find('chapel').each(function () {
                    var date = $(this).find('date').text();
                    $('#date').append(date);

                });
            }
            else
                {
                    return false;
                }
            });
    },
error: function (xhr, type) {
    $('#date').append('?');
}
});