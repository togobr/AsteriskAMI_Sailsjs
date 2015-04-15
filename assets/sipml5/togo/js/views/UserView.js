var UserView = Backbone.View.extend({
    tagName: 'div',
    className: 'user',

    events: {
        "click .icon.video" : "openVideo",
        "click .icon.audio" : "openAudio",
        "click .icon.chat" : "openChat"
    },

    peer: null,

    initialize: function() {
        _.bindAll(this, 'render');

        this.data = {
            ramalOnline: false,
            ramalEmUso: false
        };

        this.template = $('#userTemplate').html();
    },

    render: function() {
        console.log("Rendering...");
        var data = $.extend(true, {}, this.peer, this.data);

        // console.log('fooo', data);

        var rendered = Mustache.to_html(this.template, data);
        this.$el.html(rendered);
    },

    setPeer: function(peer) {
        this.peer = peer;

        // console.log('foo this.data', this.data);
        
        this.data.ramalOnline = peer.ipport != 0;
    },

    openVideo: function() {
        var $el = $(this.el),
            x = $el.find('ul'),
            data = x.attr('data-ramal');

            // sipCall("call-audiovideo"); //função do pŕoprio sipML5. js/lib/index.js

            // this.callStatus($el);
            $('body').animate({
                scrollTop: '+=520'
            }, 500)

            console.log('foo dagadaga');
    },


    openAudio: function() {
        var $el = $(this.el),
            x = $el.find('ul'),
            data = x.attr('data-ramal'),
            $id_txtPhoneNumber = $('#txtPhoneNumber');

            //para não mudar muito a estrutura original do sipML5, foi pego o número do ramal 
            //e setado no input #txtPhoneNumber que o próprio sipML5 trata.
            $id_txtPhoneNumber.val(data);

            sipCall("call-audio"); //função do pŕoprio sipML5. js/lib/index.js

            this.callStatus($el);
    },

    openChat: function() {
        var $el = $(this.el),
            x = $el.find('ul'),
            data = x.attr('data-ramal');

        window.alert("Abrindo comunicação de CHAT para o ramal "+data);
    },

    callStatus: function(user){
        var $usersDiv = user.parent();
            seconds = new Date().getSeconds(),
            $callTime = $('#timeCall');

        $usersDiv.addClass('inUse');
        
        $callTime.append('allalala');
    }
});