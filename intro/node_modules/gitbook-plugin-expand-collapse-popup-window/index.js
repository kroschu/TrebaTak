const exec = require('child_process')
    .exec;

module.exports = {
	website: {
        assets: './assets',
        js: [
            'plugin.js',
            'expand-collapse-popup-window.js'
        ],
        css: [
            'plugin.css'
        ]
    },

    hooks:
    {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        "init": function() 
        {
            var fs = require('fs');
            var path = require('path');
            //Use relative directory.
            var filePath = './js/';
            copy_js(filePath);

            function copyFile(source, target, cb) {
                // console.log("CopyFile", source, target);
                var ensureDirectoryExistence = function (filePath) {
                    var dirname = path.dirname(filePath);
                    if (fs.existsSync(dirname)) {
                        return true;
                    }
                    ensureDirectoryExistence(dirname);
                    fs.mkdirSync(dirname);
                }
                ensureDirectoryExistence(target);
            
                var cbCalled = false;
                var rd = fs.createReadStream(source);
                rd.on("error", function (err) {
                    done(err);
                });
                var wr = fs.createWriteStream(target);
                wr.on("error", function (err) {
                    done(err);
                });
                wr.on("close", function (ex) {
                    done();
                });
                rd.pipe(wr);
                function done(err) {
                    if (!cbCalled) {
                        cb(err);
                        cbCalled = true;
                    }
                }
            }
            
            function copyFilePromise(source, target) {
                return new Promise(function (accept, reject) {
                    copyFile(source, target, function (data) {
                        if (data === undefined) {
                            accept();
                        } else {
                            reject(data);
                        }
                    });
                });
            }

            function copy_js(filePath)
            {
                //Return file list
                fs.readdir(filePath, function(err, files)
                {
                    if (err)
                    {
                        console.warn(err)
                    }
                    else
                    {
                        //Traverse files in file list.  
                        files.forEach(function(filename)
                        {
                            var filedir = path.join(filePath, filename);
                            var filePath_new = path.join('./node_modules/gitbook-plugin-expand-collapse-popup-window/assets/', filename);
                            //Return fs.Stats object  
                            fs.stat(filedir, function(eror, stats)
                            {
                                if (eror)
                                {
                                    console.warn('Get file stats failed');
                                }
                                else
                                {
                                    var isFile = stats.isFile();
                                    var isDir = stats.isDirectory();
                                    if (isFile)
                                    {
                                        //var extension = path.extname(filename);
                                        //if (".js" == extension.toLowerCase())
                                        if("expand-collapse-popup-window.js" == filename)
                                        {
                                            // if(false == fs.existsSync(filePath_new)){
                                            //     fs.mkdir(filePath_new, (err) => {
                                            //         if(err && err!=-17){console.log(err);return;}
                                            //         // console.log('目录创建成功!');
                                            //     });
                                            // }

                                            copyFilePromise(filedir,filePath_new);

                                        }
                                    }
                                    /*if (isDir && ("_book" != filename))
                                    {
                                        copy_pdf(filedir);
                                    }*/
                                }
                            })
                        });
                    }
                });
            }
        },

        // This is called after the book generation
        "finish": function() {},
        // "page": function(page) {
        //     page.content = page.content.replace("....", "____");
        //         //.replace("</b>", "</strong>");
        //     return page;
        // }
    },

    filters: {
        exp_pop: function(head_text,level,content_text,popup_text,kwargs) {
            /* 对于可展开列表项，输出格式如下：
            <a id="etc_head" onclick='expand_collapse("etc","etc_head")' style="font-size:14px;padding-left:1em;color:rgb(56,137,214)">▸etc</a>
                <div class="list_content" id="etc">
            */
            /* 对于单项详情可展开项，输出格式如下：
            <a id="etc_head" onclick='expand_collapse("etc","etc_head")' style="font-size:14px;padding-left:1em;color:rgb(56,137,214)">etc</a>
                <div class="list_single" id="etc"><div style="font-size:14px;padding:8px"><script>document.write("此处是输出内容")</script></div></div>
            */
           function guid() {
                function S4() {
                   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                }
                return (S4()+S4()+"_"+S4()+"_"+S4()+"_"+S4()+"_"+S4()+S4()+S4());
            }
            var font_color ;
            var font_size;
            var id = "id_" + guid();
            var id_head = "head_" + id;
            var id_single = "single" + id;
            if(level != 0)
            {
                head_text = "►" + head_text;
                font_size = "14px";
            }
            if(level == 1) 
                font_color = "rgb(46,117,244)";
            else if(level == 2) 
                font_color = "rgb(56,137,214)";
            else if(level == 3) 
                font_color = "rgb(56,167,200)";
            else if(level == 4) 
                font_color = "rgb(66,187,180)";
            else if(level == 5) 
                font_color = "rgb(56,197,160)";
            else
                {font_color = "#444";}

            var output = '<div style="display:inline">';
            output = output + '<b><a id="' + id_head + '"'; 
            //var output = '<b><a id="' + id_head + '"'; 
            if(popup_text != 0)     // 弹出窗头部class设置
            {
                output = output + ' class="popup"' ;
            }

            if(level != 0 || content_text != 0)   // 长折叠插件、或单项详情折叠插件动作设定
            {
                output = output + ' onclick=\'expand_collapse("' +id +'","' + id_head + '")\'' ;
                if(level == 0)
                {
                    font_color = "rgb(56,167,200)";
                }
            }

            // 折叠插件字体大小，缩进距离，颜色，内容设定
            output = output + ' style="font-size:' + font_size + ';color:' + font_color ;

            if(level == 0 && content_text == 0) // 如果是单项折叠插件，且没有折叠内容，则去掉文字下划线
            {
                output = output + ';text-decoration:none' ;
            }
            output = output + '">' + head_text;

            if(popup_text != 0)     // 弹出窗中文字class设置，字体大小，字形设置，内容设置
            {
                //var margin_left = head_text.length+8;
                output = output + '<span class="popup" >' + popup_text + '</span>';
            }
            output = output + '</b></a>';

            if(!( level == 0 && content_text == 0 ))// 1、如果level>0，则此项必存在；2、如果level==0，则content_text存在此项才存在
            {
                output = output + '<div class="list_content" id="' +id +'">';
            }
            else
            {
                output = output + '<br></div>';// 为只有popup windows或什么特效都没有的项添加换行效果
            }

            if(level == 0 && content_text != 0)// 单项详情折叠插件展开后的内容设定
            {
                output = output + '<div class="list_single" id="' + id_single + '"><script>document.getElementById("' + id_single + '").innerHTML = ' + content_text + '</script></div></div></div>';
            
            }
            //output = output + '</div>';
            //if (kwargs.man) name = "Mr" + name;
            //else name = "Mrs" + name;
            return output;
        },
        exp_pop_end: function(){
            return "</div></div>"
        },


        popup: function(head_text,popup_text)
        {
//<a class="popup">b标签标题    
//  <span class="popup_text">悬浮窗文字</span>
//</a>
        function get_real_len(str) {  
            if (str == null) return 0;  
            if (typeof str != "string"){  
                str += "";  
            }  
            return str.replace(/[^\x00-\xff]/g,"01").length;
        }
            var output = '<a class="popup">' + head_text + '<span class="popup" style="font-size: 14px;font-weight:normal">' + popup_text + "</span></a><br>";
            return output;
        }
    }
};