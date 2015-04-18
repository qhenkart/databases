var app = {};
// app.server = 'https://api.parse.com/1/classes/chatterbox';

app.server = 'http://127.0.0.1:3000'

app.send = function(msgObj){

  $.ajax({
    // always use this url
    url: app.server + '/classes/messages',
    type: 'POST',
    data: JSON.stringify(msgObj),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      var timeStamp = moment(data.createdAt).calendar();
      $('#chats').prepend('<div class="chat"><div class="username">' + msgObj.userID + '</div><p class="text">' + msgObj.text + '</p><div class="footer"><div class="created">' + timeStamp + '</div><div class="room">' + msgObj.roomID + '</div></div></div>');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.addMessage = function(message){
    var timeCreated = moment(this.timeStamp).calendar();
    var room = "";
    if(this.roomID) {
      room = "Room: <span class='roomname'>" + this.roomID + "</span>";
    }
    $('#chats').append('<div class="chat"><div class="username">' + this.username + '</div><p class="text">' + this.text + '</p><div class="footer"><div class="created">' + timeCreated + '</div><div class="room">' + room + '</div></div></div>');
};
app.fetch = function() {

  $.ajax({
    url: app.server + '/classes/messages',
    type: 'GET',
    //data: {order: '-updatedAt'},
    dataType: 'json',
    contentType: 'application/json',

    success: function (data) {
      $.each(data.reverse(), function(i, item) {
        // if(item.username){
        //   item.username = item.username.replace('<', '&lt;');
        //   item.username = item.username.replace('>', '&gt;');
        // }
        if(this.roomID !== undefined){
          if(app.rooms.indexOf(this.roomID) === -1){
            app.addRoom(this.roomID);
          }
        }
        if(item.text){
          item.text = item.text.replace('<', '&lt;');
          item.text = item.text.replace('>', '&gt;');
          app.addMessage.call(this, item);
        }
      });
      app.clickFriend();
      app.clickRoom();
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get messages');
    }
  });
};

app.fetchRoom = function(room) {

  $.ajax({
    url: app.server,
    type: 'GET',
    // data: 'where={"roomname":"' + room + '"}', order: '-updatedAt',
    contentType: 'application/json',

    success: function (data) {

      $.each(data.results, function(i, item) {
        if(item.username){
          item.username = item.username.replace('<', '&lt;');
          item.username = item.username.replace('>', '&gt;');
        }
        if(this.roomname){
          if(app.rooms.indexOf(this.roomname) === -1){
            app.addRoom(this.roomname);
          }
        }
        if(item.text){
          item.text = item.text.replace('<', '&lt;');
          item.text = item.text.replace('>', '&gt;');
          app.addMessage.call(this, item);
        }
      });
      app.clickFriend();
      app.clickRoom();
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get messages');
    }
  });
};

app.changeRoom = function(){
  $('.dropdown-inverse').on('click', 'a', function(){
    app.room = $(this).text();
    $('.room-info h1').text(app.room);
    app.clearMessages();
    if(app.room === 'All Chats'){
      app.fetch();
    }
    else {
      app.fetchRoom(app.room);
    }
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.handleSubmit = function(){
  var textarea = $('.new-post textarea');
  //var room = $('#dropdownMenu.status').val();

  $('.submit').on('click', function(event){
    event.preventDefault();
    var msgObj = {};
    // msgObj.username = app.username;
    msgObj.userID = app.userID;
    msgObj.text = textarea.val();
    // msgObj.roomname = app.room;
    msgObj.roomID = 0;
    app.send(msgObj);
    textarea.focusout();
    textarea.val('');
    $(this).focusout();
  });
};

app.room = "All Chats";
app.rooms = ['All Chats'];
app.addRoom = function(room) {
  $('#roomSelect').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' + room + '</a></li>');
  app.rooms.push(room);
};

app.createRoom = function(){
  $('.addRoom').on('click', function(){
    $('.room-modal').modal('show');
  })

  $('.add-room').on('click', function(){
    var newRoom = $('#roomTitle').val();

    if(newRoom){
      if(app.rooms.indexOf(newRoom) === -1){
        $('.dropdown-menu').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#">' + newRoom + '</a></li>');
        app.rooms.push(newRoom);
      }
    }
    $('.room-modal').modal('hide');
    app.changeRoom();
  });
};

app.username = "Anonymous";
// --> TODO - create a new user upon start

app.changeName = function(){
  $('.postingAs').on('click', function(){
    $('.username-modal').modal('show');
  })

  $('.change-name').on('click', function(){
    var newName = $('#usernewname').val();

    if(newName){
      $('.posting-name').text(newName);
      app.username = newName;
      // TODO -- call a function to update user's name
      // that updates the User table in the DB
    }

    $('.username-modal').modal('hide');

  });
}

// app.userName = ["quest", 5]

app.newUser = function(){
  $('.username-modal').modal('show');

  $('.change-name').on('click', function(){
    var newName = $('#usernewname').val();

    if(newName){
      $('.posting-name').text(newName);

      $.ajax({
        url: app.server + '/classes/users',
        type: 'POST',
        data: JSON.stringify({username: newName}),
        contentType: 'application/json',
        success: function (data) {
          console.log('User created.');
        },
        error: function (data) {
          console.error('Failed to create user.');
        }
      });

      $.ajax({
        url: app.server + '/classes/users',
        type: 'GET',
        data: JSON.stringify({username: newName}),
        contentType: 'application/json',
        success: function (data) {
          console.log('User created.');
        },
        error: function (data) {
          console.error('Failed to create user.');
        }
      });



      // TODO -- call a function to update user's name
      // that updates the User table in the DB
    }

    $('.username-modal').modal('hide');

  });
}


app.friends = [];
app.addFriend = function(newFriend){

  if(app.friends.indexOf(newFriend) === -1 ){
    $('.friends-box ul').append('<li>' + newFriend + '</li>');
    app.friends.push(newFriend);
    $(".username:contains(" + newFriend + ")").parent().find('.text').addClass('friend');
  }
  else if(app.friends.indexOf(newFriend) > -1 ){
    $('.friends-box li:contains(' + newFriend + ')').remove();
    app.friends.splice( $.inArray(newFriend, app.friends), 1 );
    $(".username:contains(" + newFriend + ")").parent().find('.text').removeClass('friend');
  }
};

app.clickFriend = function(){
  $('.username').on('click', function(){
    var newFriend = $(this).text();
    app.addFriend(newFriend);
  });
}

app.clickRoom = function(){
  $('.roomname').on('click', function(){
    app.room = $(this).text();
    $('.room-info h1').text(app.room);
    app.clearMessages();
    if(app.room === 'All Chats'){
      app.fetch();
    }
    else {
      app.fetchRoom(app.room);
    }
  })
}

app.init = function() {
  $('.posting-name').text(app.username);
  app.newUser();
  app.fetch();
  app.handleSubmit();
  app.createRoom();
  app.changeRoom();
  app.changeName();



  // WHEN YOU CLICK ON THE LOGO
  $('.navbar-brand').on('click', function(){
    app.clearMessages();
    $('.room-info h1').text(this.innerHTML);
    app.fetch();
  });

};


$(document).ready( function() {
  app.init();
});
