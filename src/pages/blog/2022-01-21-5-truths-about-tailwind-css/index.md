---
title: 5 Truths About Tailwind CSS
description: ''
date: '2022-01-21'
tags: ['front-end', 'css', 'tailwind']
---

Recently, I had the opportunity to work with Tailwind CSS. At first, I was not really happy about it. I knew I had to start looking into utility-first CSS eventually, but I was just avoiding it due to the number of posts complaining and talking badly about it.

The thing is that the people who talk about it either love it or hate it. And I didn’t want to become a Tailwind evangelist or a hater trying to make people not use it. But after implementing an entire e-commerce shopping project, I think there is a mid-term where you can choose to use it when it fits the needs of your project. But you don’t have to convince everyone to use it or start a flaming war. But you get the idea.

So here’s what I learned after using it for two months and the way I see Tailwind CSS or utility-first CSS as a whole.

## It's Ugly and Verbose

I mean, there’s not much we can say about it, it’s true, it makes your HTML code very verbose, full of classes all over the place. That’s what most people complain about before even trying it, you go looking for some examples and then boom, this is what you get:

```html
<div>
  <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
  <div class="mt-1 relative rounded-md shadow-sm">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <span class="text-gray-500 sm:text-sm">
        $
      </span>
    </div>
    <input type="text" name="price" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00">
    <div class="absolute inset-y-0 right-0 flex items-center">
      <label for="currency" class="sr-only">Currency</label>
      <select id="currency" name="currency" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
        <option>USD</option>
        <option>CAD</option>
        <option>EUR</option>
      </select>
    </div>
  </div>
</div>
```

> This is an example from the [Tailwind UI docs](https://tailwindui.com/components/application-ui/forms/input-groups) for input groups (it needs a separate plugin to work).

I know it’s not a very convincing way to start, but as hard as it sounds, this is what makes Tailwind shine the most to me. Once you get used to it’s ugliness there’s a real benefit in having the markup and styling of your app all in one place, which brings us to the next topic.

## Not Leaving your HTML Makes you Build UIs Quicker

Since all of your styling is in the same place as your markup, you don’t have to go looking for classes on your code to know which styles they’re applying to your elements. No nested selectors either. No cascading rules. No CSS abstractions. No need to have tons of CSS files open on your editor. No need to go back and forth between them to understand how each one is affecting the other. If you’ve been there already, you feel the pain. With Tailwind, it’s all there for you in only one file.

That’s the beauty of utility-first CSS, you don’t even have to leave your HTML, which can save you a ton of time and even avoid lots of headaches from CSS problems. It’s just a matter of getting used to the verbose HTML, which I find much easier to read than cycling through lots of CSS files to read their classes definitions and understand their abstractions.

<!--
It also has some more complex utility classes, like the [Space Between](https://tailwindcss.com/docs/space), where you can easily add a margin horizontally or vertically between sibling elements with only one class, so you don't have to implement smart selectors to not add a margin to the last element or something like that, it's there ready for you to use. There are a lot more useful classes like this, their [docs](https://tailwindcss.com/docs) are a good point to look for them. -->

## It's a Design System that Brings Consistency by Default

Let’s admit it, how consistent are your designs? Does your typography follow a type scale all across the board? What about your color palette and spaces between elements? I bet you have seen apps like that, or even have worked in one like this it’s even more accurate on bigger teams where there are a lot of moving parts and people working on the same portions at once. There are many different values spread across your stylesheets, that hurts just to think ongoing through everything.

We, as front-end engineers, have to solve this, otherwise, we end up with an inconsistent UI, which is a big deal for companies, especially the big ones. Look at some examples like Apple, Spotify, or Netflix, I bet you can recognize any page of theirs just by looking at their brand.

That’s all solved with Tailwind. You don’t have to think about font sizes, spacings, or scales at all. Just use the scales provided by them, which you can customize if you want to. All classes with values are based on the theme, where scales for font sizes are defined, layout properties like margin and padding, and so on. So you can’t apply an arbitrary value on your elements that are not coming from the theme unless you create a class by hand, which is unrecommended, since there is a better way to use arbitrary values if you need to.

The real benefit of Tailwind is that there’s not much room for using wrong values and therefore making the UI inconsistent if you follow the rule of always using its classes. You’ll have a design system in place by default and you’ll have much more visually consistent UIs.

## It doesn't Fit all Designs

Do you remember when I said you can’t use arbitrary values? I mean, unless you create classes yourself (~but that’s is discouraged~). I think that’s a good rule to follow, avoid creating custom classes. That goes totally against the purpose of utility-first CSS, so if you have custom classes, there will always be classes to read and understand in your code aside from the markup.

Besides being a good rule to follow, there’s a downside to that. When you have custom designs, where you have to be pixel-perfect in all measures, and everything should be in the right place or size, that becomes a little painful.

There is a way you can break this rule using Tailwind [bracket notion](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values), which creates a class on the fly for you, that’s pretty good for cases when you have to use position properties to place some element in the right spot or even set specific widths or heights.

```html
<div class="w-[50px]">
  <!-- ... -->
</div>
```

Although, if you find yourself doing that a lot for non-trivial properties like `margin` or `padding` all the time, I think it's better to customize the [default theme](https://tailwindcss.com/docs/theme) according to your needs, fitting your design better.

So it’s not that it doesn’t fit all designs, but it requires some work beforehand. But if you don’t have a defined design system in place or don’t need to have one and want to move fast, Tailwind might be a perfect fit for you. Their default theme works well for most cases, and you can always customize small parts of the theme rather than creating an entire one by yourself.

## It Works Really Well with Components

We talked about what makes Tailwind good or not, and what not to do when using it, but we still didn’t talk about how to reuse the styles you create. If [Tailwind suggests](https://tailwindcss.com/docs/reusing-styles) to always use the utility-first workflow, implementing the designs with low-level classes to avoid all the headaches talked about before from CSS abstractions. How can we do it?

Inevitably, we will need to reuse some of these bundled classes across multiple files and the best strategy for that is using components if you are using frameworks like React or Vue, or you can use partial templates for templating languages like ERB or Blade. With that, we can abstract all the styles in one place. We’re still creating an abstraction but not like CSS, where multiple sources of code are affecting that style. It still keeps all the style and markup in only one place, not hurting any of the Tailwind “rules” and still using all of its benefits.

I see a lot of people asking if Tailwind works with React. They are a perfect fit together. As much as any other front-end framework or templating language, you can use Tailwind with plain HTML. There’s no problem with that, but using it along with a UI tool you can make use of it even better.

## Conclusion

That’s about it. All the truths I think are not mentioned enough by people who don’t like it. It’s a good tool, with a different approach from what we are used to when styling pages. If used in the right way and in the right place, Tailwind can bring you lots of benefits including the overall productivity of your team. I hope you find this post helpful whether you decide to use it for your project or not.

Thanks.
