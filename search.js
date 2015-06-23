// load the mindmap
function initMindMap() {
      $('body').mindmap();

  // add the data to the mindmap
  var root = $('body>ul>li').get(0).mynode = $('body').addRootNode($('body>ul>li>a').text(), {
    href:'/',
    url:'/',
    onclick:function(node) {
      $(node.obj.activeNode.content).each(function() {
        this.hide();
      });
    }
  });
  $('body>ul>li').hide();
  var addLI = function() {
    var parentnode = $(this).parents('li').get(0);
    if (typeof(parentnode)=='undefined') parentnode=root;
      else parentnode=parentnode.mynode;
    
    this.mynode = $('body').addNode(parentnode, $('a:eq(0)',this).text(), {
//          href:$('a:eq(0)',this).text().toLowerCase(),
      href:$('a:eq(0)',this).attr('href'),
      onclick:function(node) {
        $(node.obj.activeNode.content).each(function() {
          this.hide();
        });
        $(node.content).each(function() {
          this.show();
        });
      }
    });
    $(this).hide();
    $('>ul>li', this).each(addLI);
  };
  $('body>ul>li>ul').each(function() { 
    $('>li', this).each(addLI);
  });
  }

$(document).ready(function() {
  // enable the mindmap in the body
  var tags = [];
  var init = false;
  $.ajax({
  url: "https://www.googleapis.com/customsearch/v1?key=AIzaSyDVRJ03CZQORJWz5zr3RaqmYkkEvSefsJg&cx=017508012278524891188:7ubctllvwk0&q=china",
  context: document.body
  }).done(function(data) {
    var count = 0;
    data.items.forEach(function(item){
        if(item.link.indexOf('wikipedia') > -1) {
            var html = '<li><a href="' + item.link+ '" target="_blank" class="icon twitter">'+item.title+'</a></li>';
            
        } else {
             $.ajax({
                url: '/?url='+item.link,
                context: document.body
                }).done(function(data) {
                      if(!data || typeof(data) !=='string') return;
                      var index = data.indexOf('meta id="MetaKeywords"');
                      if(index===-1) {
                        index = data.indexOf('meta name="keywords"');
                      }
                      if(index >-1 && data) {
                        var keywords = data.substring(index);
                        index = keywords.indexOf('content="');
                        if(index > -1) {
                          keywords = keywords.substring(index + 9);
                          index = keywords.indexOf('"');
                          if(index >-1){
                            keywords = keywords.substring(0,index);
                            keywords = keywords.split(',');
                            keywords.forEach(function (key) {
                              var found = false;
                                tags.forEach(function (tag) {
                                  if(tag === key ) { 
                                      found= true;
                                    }
                                });
                                if(!found && tags.length < 10) {
                                  tags.push(key);
                                } 
                                if(tags.length >= 10 && !init) {
                                  init = true
                                  tags.forEach(function(tag){
                                    var html = '<li><a href="" target="_blank" class="icon twitter">'+tag+'</a></li>';
                                    $('#firstUL').append(html);
                                  });
                                  initMindMap();
                                }
                            });
                            
                          }
                        }
                      }
                      
                });
        }
        
        
    });
// setTimeout(function () {
//             tags.forEach(function(tag){
//               var html = '<li><a href="" target="_blank" class="icon twitter">'+tag+'</a></li>';
//               $('#firstUL').append(html);
//             });
//             initMindMap();
//         },6000);
    //$('#firstUL').append()
    
    
  });
  // setTimeout(function () {
        
        // },2000);
  

  

});   