
$(document).ready(sizeContent);


$(window).resize(sizeContent);


function sizeContent() {
	var newHeight = $("html").height() + "px";
	$(".header").css("height", newHeight);
	$(".content").css("top", newHeight);
}


$(window).scroll(function(){
    $(".header h1").css("opacity", 1 - $(window).scrollTop() / 600);
  });

$(window).scroll(function(){
    $(".header h2").css("opacity", 1 - $(window).scrollTop() / 600);
  });



var TreeModel= Backbone.Model.extend({
	defaults : {'id':'', 'name': '', 'icon':''},

	badgeCall: function(){
		var model = this;
		$.ajax({
		  url: "http://teamtreehouse.com/richardjohnson5.json",
		  beforeSend: function( xhr ) {
		    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
		  }
		})
		  .done(function( data, view ) {
		  	
		  	var results= JSON.parse(data)
		    console.log(results.badges.length)
		    for (var i=0; i<results.badges.length; i++){
		    	model.set({'id': results.badges[i].id, 'name': results.badges[i].name, 'icon': results.badges[i].icon_url})	 		 
		    }

		  });
	}

})


var TreeView= Backbone.View.extend({
	tagName: 'li',
	render: function (){
		var name = this.model.get('name')
		var id = this.model.get('id')
		var icon = this.model.get('icon')
		this.$el=$('#badges_list');
		this.$el.append('<li> <img class="badge_img" src="'+ icon+ '">'+name+ '</li>')
	},
	 initialize: function () {
            this.model.on("change", this.render, this);
        }
})

var treeModel = new TreeModel({})
var treeView = new TreeView({model: treeModel})

treeModel.badgeCall();


