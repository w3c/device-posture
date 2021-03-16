!['Device Posture API logo'](https://raw.githubusercontent.com/w3c/device-posture/gh-pages/images/sf-logo-s.png)

# Device Posture API

## Authors
* [Diego González-Zúñiga](https://twitter.com/diekus) ([Samsung](https://samsunginter.net))
* [Kenneth Rohde Christiansen](https://twitter.com/kennethrohde) ([Intel](https://intel.com))

## Explainer
* [Explainer on GitHub](https://github.com/SamsungInternet/Explainers/blob/gh-pages/Foldables/FoldState.md)

## Abstract

 This document specifies an API that allows web applications to request and be notified of changes of the posture of a foldable device.

## Goals

Foldable devices come in many shapes and sizes. While the use cases for the ultrabooks of the past vary significantly from those of the new trend of mobile devices due to the inherent focus on screen real estate, **the data in question is similar since it’s related to the angle of the fold**.

The **main interest in knowing the device posture is because there are interesting opportunities in the area of responsive design that enable new user experiences**. With these new devices, the user can choose to consume content and browse the web even when the device is not flat, in which case the developer might want to provide a different layout for the content depending on how the device is being used. We propose a way to expose information about the posture of the device to the developer.

## Proposals
### New CSS media query: `device-posture`

We also propose a media query that would resolve to a set of fixed postures. These postures consist of a number of predefined values that each encompass a range of angles.

Among the values that the device-posture query can take are:
* No Fold
* Laptop
* Tent
* Tablet
* Book
* Flat

#### Examples

```css
@media (device-posture: laptop) { ... }

/*for a monitor scenario*/
@media (device-posture: flat) and (orientation: portrait) { ... }
```
### New JS object in `window.screen`: `posture`

The Window property screen returns a reference to the screen object associated with the window. It already houses a similar property [`orientation`](https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation) that itself has a value for an [angle](https://w3c.github.io/screen-orientation/#idl-index).

#### Proposed Object
```javascript
DevicePosture : EventTarget {
  readonly attribute DevicePostureType type;
  attribute EventHandler onchange;
}

enum DevicePostureType {
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

!['drawing of different postures'](https://github.com/w3c/device-posture/blob/gh-pages/images/postures.png?raw=true)
