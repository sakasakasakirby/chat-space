$(function() {

  function buildHTML(user){
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $('#UserSearchResult').append(html);
  }

  function  noBuildHTML(){
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    $('#UserSearchResult').append(html);
}

function  addMemberHTML(user_name, user_id){
  let html = `
              <div class="ChatMember">
                <p class="ChatMember__name">${user_name}</p>
                <input name="group[user_ids][]" type="hidden" value="${user_id}" />
                <div class="ChatMember__remove ChatMember__button">削除</div>
              </div>
              `;
  $(".ChatMembers").append(html);
}

  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#UserSearchResult").empty();
      if(users[0]){
        users.forEach( function( user ) {
          buildHTML(user);
        });
      } else if(input.length == 0) {
        
      } else {
        noBuildHTML();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });

  $("#UserSearchResult").on('click', ".ChatMember__add", function(){

    user_name = $(this).attr('data-user-name');
    user_id = $(this).attr('data-user-id');
    $(this).parent().remove();

    addMemberHTML(user_name, user_id);
  
  });

  $(".ChatMembers").on('click', ".ChatMember__remove", function(){

    $(this).parent().remove();
  
  });


});