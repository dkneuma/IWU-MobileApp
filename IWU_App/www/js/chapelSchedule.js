$.ajax({
    type: 'GET',
    //url: 'http://localhost:8080/chapel',
    url: 'http://levi.cis.indwes.edu:8080/chapel',
    dataType: 'xml',
    success: function (data) {

        var counter = 0;
        $(data).find('chapel').each(function(){
            var speaker = $(this).find('speaker');
            var description = $(this).find('description');
            var date = $(this).find('date');
            if(counter < 3){
                $('#date-' + counter).append(date[0].innerHTML);
                $('#speaker-' + counter).append(speaker[0].innerHTML);
                $('#description-' + counter).append(description[0].innerHTML);
            }
            else{
                return false;
            }
            counter++;
        });
    },
    error: function (xhr, type) {
        $('#date').append('?');
    }
});