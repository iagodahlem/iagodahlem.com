---
layout: post
title: How to Organize Your CSS with ITCSS
description: A sane, scalable, managed CSS architecture
---

Everyone knows how CSS is painful. It's not an expressive language, has a global scope, it works like a cascade (the source order really matters), inheritance, a lot of hacks to deal with compatibility problems, and the selectors specificity war (if you want to know a litle more about how CSS works, [read this](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Cascade_and_inheritance)). The way how CSS works, opens many doors for bad code. For example, nested selectors to override a rule and take control of it, use of `!important` without caring about, write more CSS to undo other CSS, and further...

This are some of the problems that we need to deal with when working with CSS, especially for large scale projects, with a lot of developers envolved working together. So, if we don't be careful or just do not understand these problems, we can end up generating a big giant snow ball, that nobody will want to touch or refactor.

![snow ball](https://media3.giphy.com/media/3oriO6aNSTVP4QfER2/giphy.gif)

But, how to solve these problems in an elegant way, be in large or small projects, without hacks, and using CSS to our advantage? Writing CSS in specificity order, and that's where ITCSS comes to help us.

## ITCSS (Inverted Triangle CSS)

ITCSS is a CSS architecture created by [Harry Roberts](https://csswizardry.com/) for large CSS code bases, but it can also be applied to small projects. It's not a lib, but a way of thinking. It doesn't dependent of any preprocessor or framework, being able to use it with only pure CSS, or together with any preprocessor or CSS convention.

It consists in organize all your files in layers, from generic to explicit, from low specificity, to high specificity, these layers tame the source order and manage the cascade in a more sane way.

This layers are formed by __sections__, where each section has a specificity and a meaning defined. This way the specificity wars is end up, there is no redundancy, and we has an specificity that grows linearly.

With that, everything will have your specific place to live, and that is one of the things that I most like in ITCSS. When all the sections are perfectly understood, and has a concise defined pattern, you and all yout team, will always know where to put something new, or search for an existing file, avoiding a mental mapping while focused. That is, do not need to stop to think in things like:

* _"Where do I put this style? Should I create a new file, or just put into an existing one?"_
* _"Where I putted that class that I wrote last week?"_

Now, let's see what is each of this sections:

### Settings

It's all your global configurations and variables, like sizes, colors and fonts. Here don't has really CSS, just configuration for build.

```scss
$color-ui: #bada55;
$spacing-unit: 10px;
```

### Tools

Here will live mixins and functions, like mixins for media queries, font-face, animations, etc. Don't has really CSS here too.

```scss
@mixin font-brand() {
  font-family: "UI Font", sans-serif;
  font-weight: 400;
}
```

If you do not use a preprocessor, you can just ignore this first two layers.

### Generic

Here will be all things that is applied globally, with a low specificity. Think in that like styles that will be applied to all over the DOM. Like box-sizing, resets, normalize, etc. Note that here is the first layer where we use really CSS.

```scss
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

I like to put here too, somethings like [text selection](https://github.com/iagodahlem/iagodahlem.github.io/blob/master/_sass/generic/_selection.scss), [font-smoothing](https://github.com/iagodahlem/iagodahlem.github.io/blob/master/_sass/generic/_font-smoothing.scss) and [tap-highlight reset](https://github.com/iagodahlem/iagodahlem.github.io/blob/master/_sass/generic/_tap-highlight.scss).

### Elements

Here is all the unclassed HTML elements, here the style will be applied to only one specific element, like headings, links and lists. Is the last layer where we use type selectors.

```scss
ul {
  list-style: square outside;
}
```

In somewheres this layer is called as _base_, I prefer to use _elements_ because they have a more readable name.

### Objects

Objects, that's the most confused layer to me when there is _Objects_ and _Components_ together. But think in that like using [OOCSS](http://oocss.org/), like the proper author said: _No cosmetics. Agnostically named (e.g. `.ui-list`)._ Here we start to use only CSS classes.

```scss
.ui-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ui-list__item {
  padding: $spacing-unit;
}
```

Sometimes I prefer to not use this layer, for avoid this confusing mental mapping, like I said previuosly, so I do not need to stop and think: "_Is that a object or a component?_", and remain focused on the real problem.

That's other thing very nice in ITCSS, you can change and adapt anything to your specific needs.

### Components

Here, like the autor said, will be designed pieces of UI, still only using classes, with more explicity names.

```scss
.products-list {
  @include font-brand();
  border-top: 1px solid $color-ui;
}

.products-list__item {
  border-bottom: 1px solid $color-ui;
}
```

In this layer, I like to think that will be all the small independent pieces of the UI, like `.button`, `.input`, etc. And if I need to style more specific parts of the UI, that is, less independent parts, I add an new layer, called _pages_, or _layout_, depending on the specificity of this style, or the pattern adopted by the team.

### Trumps

Here will be overrides, helpers, utilities, specific classes that affect only one piece of the DOM, like, `.hidden`, `.relative`, `.one-half`, etc. Here can be used `!important`, because we need to override the other layers.

```scss
.one-half {
  width: 50% !important;
}
```

### Extra

How ITCSS is very adaptable and customizable, you can add and remove layers as you wish or as you need to scale. For example, if you need theming, you can add a _theme_ layer between components and trumps.

## Concluding

With ITCSS specificity slowly increases, can be customized with your own specific needs, alowing to scale CSS much more easily, CSS stays much more bigger, but not complicated. So if you wnat to use ITCSS, build an concise pattern with your team, and be rigid with that, then you will see all things in place, and your productivitie improved.

## References

This post were based on Harry Roberts [presentation](https://speakerdeck.com/dafed/managing-css-projects-with-itcss), with my own thoughts. Take a look if you want to go a litle further.

Thanks.
