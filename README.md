<img width="247" alt="favicon" src="https://user-images.githubusercontent.com/73939538/123794912-4c089380-d8db-11eb-811b-7367461cfdd4.png">

# Device Posture API

## Authors
* [Diego González-Zúñiga](https://twitter.com/diekus) ([Microsoft](https://microsoft.com))
* [Kenneth Rohde Christiansen](https://twitter.com/kennethrohde) ([Intel](https://intel.com))

## Abstract

This document specifies an API that allows web applications to request and be notified of changes of the posture of a device.

## Goals

The device posture is the physical position in which a device holds which may be derived from sensors in addition to the angle. New types of mobile devices are appearing that have some sort of **capabilities that allow them to change their posture**. The most common types of devices are the ones that can fold (their screen or around their screen), allowing them to physically alter their form factor. The **main interest in knowing the posture of a device is to enable new user experiences with responsive design**.

## Proposals
### New CSS media query: `device-posture`

We propose a media query that would resolve to a set of fixed postures. These postures consist of a number of predefined values that each encompass a range of angles.

Among the values that the device-posture query can take are:
* `folded` (applies to laptop/book postures)
* `folded-over` (applies to tent modes)
* `continuous` (applies to flat, tablet, or even seamless curved displays)

#### Examples

```css
/*using the device in a 'book' posture*/
@media (device-posture: folded) and (screen-spanning: single-fold-vertical) { ... }

/*using the device in a 'tent' posture*/
@media (device-posture: folded-over) { ... }
```
### New JS object in `window.navigator`: `devicePosture`

The Navigator property of Window [navigator](https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object) should host device capabilities and system states.

#### Proposed Object
```javascript
DevicePosture : EventTarget {
  readonly attribute DevicePostureType type;
  attribute EventHandler onchange;
}

enum DevicePostureType {
  "folded",
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
