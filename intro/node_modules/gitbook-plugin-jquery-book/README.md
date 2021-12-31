# gitbook-plugin-jquery-book
jQuery Plugin for my jQuery book https://antonshevchuk.gitbooks.io/jquery-for-beginners/

## Create IFRAME

Required arguments:
* `id` - first argument
* `src` - second argument

Optional arguments:
* `width`
* `height`
* other html attributes

Optional blocks:
* `{% sticky %}` - to append sticky control
* `{% reload %}` - to append reload control
  
```markdown
{% jqbFrame "html-example", "../code/index.html", height="160px" %}
{% sticky %}
{% reload %}
{% endjqbFrame %}
```

### Create button to append STYLE

Require `id` of target iframe
```markdown
{% jqbScript "#html-example" %}p { color: orange }{% endjqbScript %}
```

### Create button to append SCRIPT

Require `id` of target iframe
```markdown
{% jqbScript "#html-example" %}alert("Hello!"){% endjqbScript %}
```

### Create button to run SCRIPT

Require `id` of target iframe. It should appended above the block of code:
```markdown
{% jqbRun "#html-example" %}{% endjqbRun %}
<code>
alert("Hello!");
</code>
```

### Create button to highlight elements

Require `id` of target iframe
```markdown
{% jqbHighlight "#html-example" %}$("#content"){% endjqbHighlight %}
```

### Create button to eval SCRIPT on book page

It should appended above the block of code:
```markdown
{% jqbEval  %}{% endjqbEval %}
<code>
alert("Hello!");
</code>
```
