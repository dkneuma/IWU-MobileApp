$.ajax({
    type: 'GET',
    url: 'http://levi.cis.indwes.edu:8000/file',
    dataType: 'xml',
    success: function(data){

        $(data).find('item').each(function(){
            var title = $(this).find('title').text();
            $('#demo').append(title);
        });

    },
    error: function(xhr, type){
        $('#demo').append('?');
    }
});
