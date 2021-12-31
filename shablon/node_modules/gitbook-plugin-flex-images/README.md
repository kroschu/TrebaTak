# Flexbox Thumbnails for GitBook

Display a block image images as a flexible row of thumbnails.

**Note** This does not yet work with ebook (pdf, ePub) output.

```markdown
{% flex-images %}
  ![Alt Text](http://placehold.it/640x480)
  ![Alt Text](http://placehold.it/640x480)
  ![Alt Text](http://placehold.it/640x480)
  ![Alt Text](http://placehold.it/640x480)
{% endflex-images %}
```

<div class="figure-block" style="padding: .5vw; font-size: 0; flex-flow: row wrap; display: flex; align-content: space-between;">
  <div style="flex: auto; width: 200px; margin: .5vw;">
    <img src="http://placehold.it/640x480" alt="" style="width: 100%; height: auto; padding: 2px; border: 1px solid #dddddd;"/>
  </div>
  <div style="flex: auto; width: 200px; margin: .5vw;">
    <img src="http://placehold.it/640x480" alt="" style="width: 100%; height: auto; padding: 2px; border: 1px solid #dddddd;"/>
  </div>
  <div style="flex: auto; width: 200px; margin: .5vw;">
    <img src="http://placehold.it/640x480" alt="" style="width: 100%; height: auto; padding: 2px; border: 1px solid #dddddd;"/>
  </div>
  <div style="flex: auto; width: 200px; margin: .5vw;">
    <img src="http://placehold.it/640x480" alt="" style="width: 100%; height: auto; padding: 2px; border: 1px solid #dddddd;"/>
  </div>
  <div style="flex: auto; width: 200px; margin: .5vw;">
    <img src="http://placehold.it/640x480" alt="" style="width: 100%; height: auto; padding: 2px; border: 1px solid #dddddd;"/>
  </div>
</div>
