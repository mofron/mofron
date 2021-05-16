# setting
The setting tag is the first and most basic element you define in a mofron file.This element sets the settings for the entire content.For example, you can set what kind of module to use, effects and themes to be applied to the entire page.The setting method defines the child element in the setting tag. The child elements that can be defined in the setting tag are shown below.

## tag
This element is used when using modules such as components.Defines the name of the module to be loaded when used in the mofron file.The tag name defined in the tag element can be used as a user-defined tag in the mofron file.   
The following is a sample when using the Button module.

```xml
<setting>
    <tag load="mofron-comp-button">Button</tag>
</setting>
<Button>button</Button>
```

## html-style

## root-conf

# script

# template

# mf-*
