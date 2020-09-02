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

  $('.wrapper__main-chat__bottom__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    console.log(formData);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.wrapper__main-chat__middle').append(html)
      $('.wrapper__main-chat__bottom__form')[0].reset();
      $('.wrapper__main-chat__middle').animate({ scrollTop: $('.wrapper__main-chat__middle')[0].scrollHeight});
      $('.wrapper__main-chat__bottom__form__submit__button').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })


});
