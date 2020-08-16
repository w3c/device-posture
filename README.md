!['Screen Fold API logo'](https://raw.githubusercontent.com/w3c/screen-fold/master/images/sf-logo-s.png)

# Screen Fold API

## Authors
* [Diego González-Zúñiga](https://twitter.com/diekus) ([Samsung](https://samsunginter.net))
* [Kenneth Rohde Christiansen](https://twitter.com/kennethrohde) ([Intel](https://intel.com))

## Explainer
* [Explainer on GitHub](https://github.com/SamsungInternet/Explainers/blob/master/Foldables/FoldState.md)

## Abstract

This document specifies an API that allows web applications to request the angular value to which a device with a screen hinge is folded. Under the right conditions, and if allowed, the value representing the angle in degrees is returned.

## Goals

Foldable devices come in many shapes and sizes. While the use cases for the ultrabooks of the past vary significantly from those of the new trend of mobile devices due to the inherent focus on screen real estate, **the data in question is similar since it’s related to the angle of the fold**.

The **main interest in knowing the fold angle is because there are interesting opportunities in the area of responsive design that enable new user experiences**. With these new devices, the user can choose to consume content and browse the web even when the device is not flat, in which case the developer might want to provide a different layout for the content depending on the state of the angle of the fold. We propose a way to expose information about the fold angle of the device to the developer. Additionally, developers would like to adopt content depending on the various modes and potentially also animate some of these transitions.

## Proposals

### New CSS media query: `screen-fold-angle` 

In order to cater to foldable devices, we propose the addition of 2 new media queries `min-angle` and `max-angle` which values can take an angle from the CSS data type.

#### Examples

```css
@media(min-screen-fold-angle: 110deg) { ... }

@media(max-screen-fold-angle: 170deg) and (spanning: single-fold-vertical) { ... }
```

### New CSS media query: `screen-fold-posture`

We also propose a media query that would resolve to a set of fixed postures. These postures consist of a number of predefined values that each encompass a range of angles.

Among the values that the screen-posture query can take are:
* No Fold
* Laptop
* Tent
* Tablet
* Book
* Flat

#### Examples

```css
@media (screen-fold-posture: laptop) { ... }

/*for a monitor scenario*/
@media (screen-fold-posture: flat) and (orientation: portrait) { ... }
```

### New CSS environmental variable: screen-fold-angle

We also propose the addition of a new environmental variable, ‘screen-fold-angle’, which contains the value of the angle on which the screen is folded. The value of this environmental variable is of the CSS angle data type.

```css
env(screen-fold-angle);
```

### New JS object in `window.screen`: `ScreenFold`

The Window property screen returns a reference to the screen object associated with the window. It already houses a similar property [`orientation`](https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation) that itself has a value for an [angle](https://w3c.github.io/screen-orientation/#idl-index).

#### Proposed Object
```javascript
ScreenFold : EventTarget {
  readonly attribute unsigned short angle;
  readonly attribute ScreenFoldMode mode;
  attribute EventHandler onchange;
}

enum ScreenFoldMode {
  "laptop",
  “...”,
}
```

## Stakeholder Feedback
No stakeholder feedback has been given at this time.

## References & Acknowledgements
Many thanks for valuable feedback and advice from:
* [Daniel Appelquist](https://twitter.com/torgo), [Samsung](https://samsunginter.net) 
* [Alexis Menard](https://twitter.com/darktears), [Intel](https://intel.com) 
* [Jo Balletti](https://twitter.com/thisisjofrank), [Ably Realtime](https://ably.io)
* [Michael Blix](https://twitter.com/mkeblx), [Samsung](https://samsunginter.net) 

!['drawing of different postures'](https://github.com/w3c/screen-fold/blob/master/images/postures.png?raw=true)
