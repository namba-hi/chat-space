$(function(){
  
  var reloadMessages = function() {
    last_message_id = $('.chatmain__message__block__messages:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chatmain__message').append(insertHTML)
        $('.chatmain__message').animate({ scrollTop: $('.chatmain__message')[0].scrollHeight});
        $('form')[0].reset();
        $(".form__submit-btn").prop("disabled", false);
      }
    })
    .fail(function() {
      alert("error")
    });
  };
  
  function buildHTML(message){
    if ( message.content && message.image ) {
      var html = 
        `<div class="chatmain__message__block">
          <div class="chatmain__message__block__upper">
            <p class="chatmain__message__block__upper__username">
              ${message.user_name}
            </p>
            <p class="chatmain__message__block__upper__info">
              ${message.created_at}
            </p>
          </div>
          <div class="chatmain__message__block__messages" data-message-id=${message.id}> 
            <p class="chatmain__message__block__messages__content"> 
              ${message.content} 
            </p>
            <div class="chatmain__message__block__messages-image"> 
              <img src=${message.image} ></img> 
            </div> 
          </div> 
        </div>`
      return html;
    } else if (message.content) {
      var html =
      `<div class="chatmain__message__block"> 
      <div class="chatmain__message__block__upper">
        <p class="chatmain__message__block__upper__username">
          ${message.user_name}
        </p>
        <p class="chatmain__message__block__upper__info">
          ${message.created_at}
        </p>
      </div>
      <div class="chatmain__message__block__messages" data-message-id=${message.id}> 
        <p class="chatmain__message__block__messages__content"> 
          ${message.content} 
        </p> 
      </div> 
      </div>`
      return html;
    } else if (message.image) {
      var html = 
        `<div class="chatmain__message__block">
          <div class="chatmain__message__block__upper">
            <p class="chatmain__message__block__upper__username">
              ${message.user_name}
            </p>
            <p class="chatmain__message__block__upper__info">
              ${message.created_at}
            </p>
          </div>
          <div class="chatmain__message__block__messages" data-message-id=${message.id}>
            <div class="chatmain__message__block__messages-image">
              <img src=${message.image} ></img>
            </div>
          </div>
        </div>`
      return html;

    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var url = $(this).attr('action');
      var html = buildHTML(data);
      $('.chatmain__message').append(html);
      $('.chatmain__message').animate({ scrollTop: $('.chatmain__message')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
    });
   return false
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});