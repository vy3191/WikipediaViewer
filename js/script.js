$(document).ready(function(){
   $('.search-input').on('keyup',function(event){
            event.preventDefault();
            if(event.which === 13) {
               var inputValue = $(this).val()
               var url = "https://en.wikipedia.org/w/api.php?action=opensearch&&search="+inputValue+"&format=json&callback=?";
                ajaxCall(url); 
                $(this).val('');
            }

    });
});

function ajaxCall(setUrl) {
    $.ajax({
          type: 'GET',
          url: setUrl,
          async: false,
          beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
              xhr.overrideMimeType('application/json;charset=utf-8');
            }
          },
          dataType: 'json',
          success: function (data,status, jqXHR) {
             // console.log(data);
             render(data);

         } 
    });
}



function render(list) {
          var container = document.querySelector('.wikiData');
              container.innerHTML = '';
     for(var i=0; i<list[1].length; i++) {
           var anchor =  list[3][i];
           var heading = list[1][i];
           var para = list[2][i];
    
     console.log(anchor);
     console.log(heading);
     console.log(para);
   

    var div = document.createElement('div');
        div.classList.add('box');
    var link = document.createElement('a');
               link.classList.add("link");
               link.href = anchor;
               link.setAttribute('target', '_blank');
               // link.textContent = anchor;

    var head = document.createElement('h3');
               head.innerHTML = heading;
               head.classList.add("lead");
              
               console.log(heading);
    var paragraph = document.createElement('p');
               paragraph.classList.add('description');
               paragraph.textContent = para;

    link.append(head);
    link.append(paragraph);
    div.append(link);

    container.append(div); 
     
   }
     return container;    
}




