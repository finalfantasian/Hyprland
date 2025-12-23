#version 300 es
#extension GL_ARB_shading_language_include : enable

precision highp float;
in vec2 v_texcoord; // is in 0-1
uniform sampler2D tex;

uniform float contrast;
uniform float brightness;

#include "CM.glsl"
#include "gain.glsl"
uniform int sourceTF; // eTransferFunction
uniform int targetTF; // eTransferFunction 

float gain(float x, float k) {
    float a = 0.5 * pow(2.0 * ((x < 0.5) ? x : 1.0 - x), k);
    return (x < 0.5) ? a : 1.0 - a;
}

layout(location = 0) out vec4 fragColor;
void main() {
    vec4 pixColor = texture(tex, v_texcoord);

    // contrast
    if (contrast != 1.0)
        pixColor.rgb = gain(pixColor.rgb, contrast);

    // brightness
    pixColor.rgb *= max(1.0, brightness);

    fragColor = pixColor;
}
