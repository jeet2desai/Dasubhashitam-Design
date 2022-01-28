(function(){
    "use strict"    
    // Plugin Constructor
    var TagsInput = function(opts){
        this.options = Object.assign(TagsInput.defaults , opts);
        this.init();
    }

    // Initialize the plugin
    TagsInput.prototype.init = function(opts){
        this.options = opts ? Object.assign(this.options, opts) : this.options;

        if(this.initialized)
            this.destroy();
            
        if(!(this.orignal_input = document.getElementById(this.options.selector)) ){
            return this;
        }

        this.arr = [];
        this.wrapper = document.createElement('div');
        this.input = document.createElement('input');
        this.input.placeholder = "Search cat - tags...";
        init(this);
        initEvents(this);
        this.initialized =  true;
        return this;
    }

    // Add Tags
    TagsInput.prototype.addTag = function(string){

        if(this.anyErrors(string))
            return ;

        this.arr.push(string);
        var tagInput = this;

        var tag = document.createElement('span');
        tag.className = this.options.tagClass;
        tag.innerText = string;

        var closeIcon = document.createElement('a');
        closeIcon.innerHTML = '&times;';
        
        closeIcon.addEventListener('click' , function(e){
            e.preventDefault();
            var tag = this.parentNode;
            for(var i =0 ;i < tagInput.wrapper.childNodes.length ; i++){
                if(tagInput.wrapper.childNodes[i] == tag)
                    tagInput.deleteTag(tag , i);
            }
        })
        tag.appendChild(closeIcon);
        this.wrapper.insertBefore(tag , this.input);
        this.orignal_input.value = this.arr.join(',');
        return this;
    }

    // Delete Tags
    TagsInput.prototype.deleteTag = function(tag , i){
        tag.remove();
        this.arr.splice( i , 1);
        this.orignal_input.value =  this.arr.join(',');
        return this;
    }

    // Make sure input string have no error with the plugin
    TagsInput.prototype.anyErrors = function(string){
        if( this.options.max != null && this.arr.length >= this.options.max ){
            return true;
        }
        
        if(!this.options.duplicate && this.arr.indexOf(string) != -1 ){
            console.log('duplicate found " '+string+' " ')
            return true;
        }

        return false;
    }

    // Add tags programmatically 
    TagsInput.prototype.addData = function(array){
        var plugin = this;
        array.forEach(function(string){
            plugin.addTag(string);
        })
        return this;
    }

    // Get the Input String
    TagsInput.prototype.getInputString = function(){
        return this.arr.join(',');
    }
    // destroy the plugin
    TagsInput.prototype.destroy = function(){
        this.orignal_input.removeAttribute('hidden');

        delete this.orignal_input;
        var self = this;
        Object.keys(this).forEach(function(key){
            if(self[key] instanceof HTMLElement)
                self[key].remove();
            
            if(key != 'options')
                delete self[key];
        });

        this.initialized = false;
    }
    function init(tags){
        tags.wrapper.append(tags.input);
        tags.wrapper.classList.add(tags.options.wrapperClass);
        tags.orignal_input.setAttribute('hidden' , 'true');
        tags.orignal_input.parentNode.insertBefore(tags.wrapper , tags.orignal_input);
    }
    function initEvents(tags){
        tags.wrapper.addEventListener('click' ,function(){
            tags.input.focus();           
        });
        tags.input.addEventListener('keydown' , function(e){
            var str = tags.input.value.trim(); 

            if( !!(~[9 , 13 , 188].indexOf( e.keyCode ))  )
            {
                e.preventDefault();
                tags.input.value = "";
                if(str != "")
                    tags.addTag(str);
            }

        });
    }

    TagsInput.defaults = {
        selector : '',
        wrapperClass : 'tags-input-wrapper',
        tagClass : 'tag',
        max : null,
        duplicate: false
    }

    window.TagsInput = TagsInput;

})();

var tagInput1 = new TagsInput({
    selector: 'tag-input1',
    duplicate : true,
    max : 10
});

$( document ).ready(function() {
    // modal
    $('.modal-toggle').on('click', function(e) {
        e.preventDefault();      
        var dataTarget = $(this).attr('data-target');
        $(dataTarget).toggleClass('is-visible');    
        $('body').addClass('modal-open');
    });

    $('.modal-close, .modal-overlay').on('click', function(e) {      
        e.preventDefault();   
        $(this).closest('.modal').removeClass('is-visible');
        $('body').removeClass('modal-open');
    });

    // more option dropdown
    $('.more-options-dropdown .dropbtn').on('click', function(e) {
        e.stopImmediatePropagation();
        $(this).closest('.more-options-dropdown').find('.dropdown-content').fadeToggle();
    });

    $('.more-options-dropdown .dropdown-content li').on('click', function(e) {
        e.stopImmediatePropagation();
        $(this).closest('.dropdown-content').fadeOut();
    });

    // title option dropdown
    $('.dropdown-wrapper .dropdown-link').on('click', function(e) {
        e.stopImmediatePropagation();
        // all-users table dropdown
        $(this).closest('tr').siblings().find('.dropdown-box').fadeOut();
        // title dropdown
        $(this).closest('.dropdown-wrapper').siblings().find('.dropdown-box').fadeOut();    
        $(this).closest('.dropdown-wrapper').find('.dropdown-box').fadeToggle();
    });

    // table accordion
    $(".fold-table tr.view").on("click", function(){    
        $(this).toggleClass("open").next(".fold").toggleClass("open");    
        $(this).removeClass("edit-open").next(".fold").removeClass("edit-open");  
    });

    //edit-icon-table
    $(".fold-table .edit-icon").on('click',function(e) {    
        e.preventDefault(); 
        e.stopPropagation();     
        $(this).closest("tr.view").addClass("edit-open");
        $(this).closest("tr.view").next('.fold').addClass('edit-open');
        if($(this).closest("tr.view").hasClass('open')){
           $(this).closest("tr.view").addClass("open").next(".fold").addClass("open");
        }else{
            $(this).closest("tr.view").addClass("open").next(".fold").addClass("open");
        }
    });

    //cancel edit table
    $(".fold-table .cancel-btn-row .cancel-btn").on('click',function(e) {  
        e.preventDefault(); 
        e.stopPropagation();
        $(this).closest("tr.view").removeClass("edit-open");
        $(this).closest("tr.view").next('.fold').removeClass('edit-open');
    });

    // edit table textarea height
    $(".fold-table textarea").on("input", function() {  
        $(this).css("height","auto");
        $(this).css({"height": (this.scrollHeight) + "px", 'overflow-y':'hidden' });               
    }); 

    $('body').on('click', function() {
        $('.more-options-dropdown .dropdown-content').fadeOut();         
    });

    $(document).on('click',function(e){
        // title option dropdown
        if (!$(e.target).closest(".dropdown-wrapper .dropdown-link,.dropdown-wrapper .dropdown-box").length) {
            $('.dropdown-wrapper .dropdown-box').fadeOut();     
            }   
    });

    //edit-box-open 
    $(".edit-btn").click(function(e){
        e.preventDefault();
        $(this).closest(".subscription-boxes").addClass("edit-box-open");
    }); 

    // youtube video add more
    $('.app-video-content .video-action .add-more-video').click(function(e){
        e.preventDefault();     
        var videoList = $('<li class="video-list"><div class="form-row"><div class="form-col"><label>Name</label><input type="text" placeholder=""></div><div class="form-col"><label>URL</label><input type="text" placeholder=""></div></div><div class="action-col"><a href="#" class="delete-icon"><img src="images/delete.svg" alt="delete" /></a></div></li>');
        $('.app-video-content .app-video-list').append(videoList); 
    });      
    $(document).on("click",".app-video-content .delete-icon",function(e){
        e.preventDefault();
        $(this).closest('.app-video-content .video-list').remove();
    });

    // moment collection add more
    $('.video-collection-content .video-action .add-more-video').click(function(e){
        e.preventDefault();     
        var videoList = $('<li class="video-list"><div class="category-info-row upload-photo-row"><div class="category-photo"><div class="upload-btn"><input type="file"class="upload"title=" "><img src="images/camera.svg"alt="camera-icon"></div><div class="upload-file"><img src="images/gray-img.png"alt="profile-img"></div></div><div class="category-detail"><fieldset><ol><li class="string input optional stringish col-row"id=""><div class="col-6"><label class="label"for="Collection name">Collection name</label><input id="Collection name"type="text"name=""placeholder="Happiness"></div><div class="col-6"><label class="label"for="alt-txt">Alt - text</label><input id="alt-txt"type="text"name=""placeholder=""></div></li><li class="string input optional stringish"id="Tags_input"><label class="label"for="Tags">Tags</label><input id="Tags"type="text"name=""placeholder="Happiness"></li></ol></fieldset></div></div></li>');
        $('.video-collection-content .video-collection-list').append(videoList); 
    });

    // header submenu class
    var li = $(".header-wrapper .header-item li").has(".submenu");
    if (li.length > 0) {        
        li.addClass("has-submenu");
    }

    // header mobile submenu accordion
    if($(window).width() <= 767) {
        $(".header-wrapper .header-item li a").click(function () {
            if ($(this).parent().hasClass("open")) {
                $(this).parent().removeClass("open");
                $(this).siblings("ul").slideUp(500);
            } else {
                $(this).parent().siblings("li").find("li").removeClass("open");
                $(this).parent().siblings("li").removeClass("open").find("ul").slideUp(500);
                $(this).parent().addClass("open");
                $(this).siblings("ul").slideDown(500);
            }
        });
    }

    //submenu-toggle
    var hamburger = $(".hamburger");
    var navLinks = $(".nav-links");
    var links = $(".nav-links li");

    hamburger.on('click',function() {
        //Animate Links
        navLinks.toggleClass("open");        
        $('body').toggleClass('menu-open');   
        //Hamburger Animation
        hamburger.toggleClass("toggle");
    });

    // delete title notification
    $('.delete-title-link').on('click',function(){
        $('.title-delete-notification').addClass('open');
    });
    $('.title-delete-notification .close-icon').on('click',function(){
        $('.title-delete-notification').removeClass('open');
    });  
});
