# Add expand-collapse effect to an area of content.Show a popup window on mouseover

## Preview:  
![](https://github.com/huyuan7494/gitbook-plugin-expand-collapse-popup-window/raw/master/screenshot/Comprehensive.gif)

## Usage:

`{{ "head text" | exp_pop(level,"JS_var","popup text") }}`    
`content to be expand-collapse`  
`{{ ""|exp_pop_end }}`  
>Note:Your javascript var should define in `your_gitbook_dir/js/expand-collapse-popup-window.js`

### parameters:
- `head text` : String to add effect
- `level` : 
    - if 0,the content to be expand-collapse is `JS_var`,whitch is a javascript string var
    - if 1-5,the content to be expand-collapse is `content to be expand-collapse`,
    end with `{{ ""|exp_pop_end }}`.The larger level ,the lighter of the font color of `head text`
- `JS_var` : A javascript string var to be add into the html/markdown to be expand-collapse. 
If set with `0`, there will be no content to be add.
- `popup text` : Text to show in a popup window onmouseover

## Examples:
- Expand_collapse content
```html
List of the names of students'.
{{ "Click to see details" | exp_pop(1,0,0) }}    
Tom<br>
Mike<br>
Zoey<br>
Lilei<br>
Hanmeimei<br>
Michle<br>
Tony<br>
Ryan<br>
{{ ""|exp_pop_end }}
```
**Preview:**  
![](https://github.com/huyuan7494/gitbook-plugin-expand-collapse-popup-window/raw/master/screenshot/Expand_collapse.gif)

- Nesting expand_collapse content
```html
{{ "List of the names sort by sex" | exp_pop(1,0,0) }}
<tt>
|-- {{ "boys" | exp_pop(2,0,0) }}
|....|-- Tom<br>
|....|-- Mike<br>
|....|-- Tony<br>
|....|-- Ryan<br>
|....|-- {{ "newcomer" | exp_pop(3,0,0) }}
|....|....|-- Lilei<br>
        {{ ""|exp_pop_end }}
    {{ ""|exp_pop_end }}
|-- {{ "girls" | exp_pop(2,0,0) }}
|....|-- Hanmeimei<br>
|....|-- Avel<br>
|....|-- Zoey<br>
|....|-- Lucy<br>
|....|-- Lili<br>
</tt>
    {{ ""|exp_pop_end }}
{{ ""|exp_pop_end }}
```
**Preview:**  
![](https://github.com/huyuan7494/gitbook-plugin-expand-collapse-popup-window/raw/master/screenshot/Nesting_expand_collapse.gif)

- Customize content  
```html
<script>
    var my_text="Hello this is an example of customize content.<br>\
if you want to wrap ,you have to type a '<br>',and '\r\n' is no use.<br>\
Like this \r\n see, no use.";
</script>
{{ "Click here" | exp_pop(0,"my_text",0) }}
```
**Preview:**  
![](https://github.com/huyuan7494/gitbook-plugin-expand-collapse-popup-window/raw/master/screenshot/Customize_content.gif)

- Popup window
```html
{{ "Move cursor over here." | exp_pop(0,0,"This is a popup window on mouseover.") }}
```
**Preview:**  
![](https://github.com/huyuan7494/gitbook-plugin-expand-collapse-popup-window/raw/master/screenshot/popup_window.gif)

- Comprehensive example
```html
{{ "Click to see students' details" | exp_pop(1,0,0) }}
<tt>
|-- {{ "boys" | exp_pop(2,0,0) }}
|....|-- {{ "Tom" | exp_pop(0,"Tom_info",0) }}
|....|-- Mike<br>
|....|-- Tony<br>
|....|-- Ryan<br>
|....|-- {{ "newcomer" | exp_pop(3,0,0) }}
|....|....|-- {{ "Lilei" | exp_pop(0,0,"Lilei come to our school last week.") }}
        {{ ""|exp_pop_end }}
    {{ ""|exp_pop_end }}
|-- {{ "girls" | exp_pop(2,0,0) }}
|....|-- Hanmeimei<br>
|....|-- Avel<br>
|....|-- Zoey<br>
|....|-- Lucy<br>
|....|-- Lili<br>
</tt>
    {{ ""|exp_pop_end }}
{{ ""|exp_pop_end }}
```
**Preview**  
![](https://github.com/huyuan7494/gitbook-plugin-expand-collapse-popup-window/raw/master/screenshot/Comprehensive.gif)