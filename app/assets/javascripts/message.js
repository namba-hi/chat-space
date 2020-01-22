$(function(){
  function buildHTML(message){
    if ( message.image ) {
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
          <div class="chatmain__message__block__messages">
            <p class="chatmain__message__block__messages__content">
              ${message.content}
            </p>
            <div class="chatmain__message__block__messages-image">
              <img src=${message.image} ></img>
            </div>
          </div>
        </div>`
      return html;
    } else {
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
      <div class="chatmain__message__block__messages">
        <p class="chatmain__message__block__messages__content">
          ${message.content}
        </p>
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

      var html = buildHTML(data);
      $('.chatmain__message').append(html);
      $('.chatmain__message').animate({ scrollTop: $('.chatmain__message')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
    });
    return false;
})
});