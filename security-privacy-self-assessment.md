# Security and Privacy Questionnaire

[Security and Privacy questionnaire](https://www.w3.org/TR/security-privacy-questionnaire/)
responses for the Device Posture API

### 2.1. What information might this feature expose to Web sites or other parties, and for what purposes is that exposure necessary?

This API exposes the posture of the device, a physical state of a device. The posture typically apply only to device with a foldable screen or dual screens devices (devices with two screens connected with a physical hinge). The posture is typically derived from the hinge angle sensor, but additional data can be used to determine the posture such as whether the keyboard is attached or not, whether the kickstand is deployed or not, etc.

At the moment the specification exposes two postures:
- folded
- continuous

In order for developers to take advantage of the new devices, they need to know how they are being used so they can implement better responsive design in their application. Here are few simple use cases :

- Avoiding content in the fold area (like buttons).
- Providing a split user interface to leverage the additional screen estate.

### 2.2. Is this specification exposing the minimum amount of information necessary to power the feature?

The API design only exposes a defined set of postures which is ultimately determined by the OS/platform. For example, the API doesn't expose the raw sensor values for the hinge angle.

### 2.4. How does this specification deal with sensitive information?

The information exposed by this API is not sensitive information.

### 2.5. Does this specification introduce new state for an origin that persists across browsing sessions?

This API does not introduce any new persistent state per say, because the posture can change across browsing sessions, but it can also be the same.

### 2.6. What information from the underlying platform, e.g. configuration data, is exposed by this specification to an origin?

Aside from the posture values, nothing else is exposed.

### 2.7. Does this specification allow an origin access to sensors on a user’s device

This specification does not allow direct access to sensors.

### 2.8. What data does this specification expose to an origin? Please also document what data is identical to data exposed by other features, in the same or different contexts.

See answer question 1.

### 2.9. Does this specification enable new script execution/loading mechanisms?

No.

### 2.10. Does this specification allow an origin to access other devices?

No.

### 2.11. Does this specification allow an origin some measure of control over a user agent’s native UI?

No.

### 2.12. What temporary identifiers might this specification create or expose to the web?

The device posture API could be used to identify whether the device is a foldable device. But it doesn't allow to figure out a given device or model because the API is too broad and there are now many devices on the market (with different screen resolutions, different OSes, etc).

### 2.13. How does this specification distinguish between behavior in first-party and third-party contexts?

The specified API will be available in third-part contexts via iframe
guarded by permission policy and focus requirements. The API is also only available in secure contexts.

### 2.14. How does this specification work in the context of a user agent’s Private Browsing or "incognito" mode?

The API works the same way in Private Browsing / "incognito". It is high level enough to prevent identification between a private or normal browsing mode.

### 2.15. Does this specification have a "Security Considerations" and "Privacy Considerations" section?

Yes.

### 2.16. Does this specification allow downgrading default security characteristics?

No.

### 2.17. What should this questionnaire have asked?

We think that the questions here accurately capture the API's security and privacy implications.