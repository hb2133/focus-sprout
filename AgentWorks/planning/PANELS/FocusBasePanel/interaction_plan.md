# FocusBasePanel Interaction Plan

```text
Start CTA -> Controller -> Start Action -> Timer Manager -> storage/alarm -> Panel refresh
Pause CTA -> Controller -> Pause Action -> Timer Manager -> storage/alarm -> Panel refresh
Reset CTA -> Controller -> ResetConfirm open -> confirm result -> Reset Action
Settings CTA -> Controller -> Settings open -> validated result -> SaveSettings Action
Alarm elapsed -> background -> Timer Manager completion -> storage change -> Panel refresh
```
