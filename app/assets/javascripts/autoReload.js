$(function(){
  
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="wrapper__main-chat__middle__block" data-message-id=${message.id}>
          <div class="wrapper__main-chat__middle__block__info">
            <div class="wrapper__main-chat__middle__block__info__name">
              ${message.user_name}
            </div>
            <div class="wrapper__main-chat__middle__block__info__date">
              ${message.time}
            </div>
          </div>
          <div class="wrapper__main-chat__middle__block__message">
            <p class="Message__text">
              ${message.text}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="wrapper__main-chat__middle__block" data-message-id=${message.id}>
          <div class="wrapper__main-chat__middle__block__info">
            <div class="wrapper__main-chat__middle__block__info__name">
              ${message.user_name}
            </div>
            <div class="wrapper__main-chat__middle__block__info__date">
              ${message.time}
            </div>
          </div>
          <div class="wrapper__main-chat__middle__block__message">
            <p class="Message__text">
              ${message.text}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.wrapper__main-chat__middle__block:last').data("message-id") || 0;
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.wrapper__main-chat__middle').append(insertHTML);
        $('.wrapper__main-chat__middle').animate({ scrollTop: $('.wrapper__main-chat__middle')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});