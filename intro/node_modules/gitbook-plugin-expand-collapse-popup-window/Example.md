
<link rel="stylesheet" href="css.css" type="text/css" />
<script type="text/javascript" src="js.js"></script>

## Examples for gitbook-plugin-expand-collapse-popup-window
#### Expand_collapse content
{{ "List of the students' names" | exp_pop(1,0,0) }}    
Tom<br>
Mike<br>
Zoey<br>
Lilei<br>
Hanmeimei<br>
Michle<br>
Tony<br>
Ryan<br>
{{ ""|exp_pop_end }}  

#### Nesting expand_collapse content
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

#### Customize content
{{ "Click here" | exp_pop(0,"my_text",0) }}

#### popup window on mouseover
{{ "Move cursor over here." | exp_pop(0,0,"This is a popup window on mouseover.") }}

#### Comprehensive example
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