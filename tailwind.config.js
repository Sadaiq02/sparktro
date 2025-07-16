import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.vue",
    ],
    safelist: ["bg-[#0A97B0]"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["'Work Sans'", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                gray: {
                    sparktro: "#F1F1F1",
                },
                primary: {
                    sparktro: "#0A97B0",
                },
                black: {
                    sparktro: "#1E2533",
                },
                red: {
                    sparktro: "#FF4340",
                },
                yellow: {
                    sparktro: "#FDCB02",
                },
                textTeal: {
                    sparktro: "#5BD1D7",
                },
            },
        },
    },

    plugins: [forms],
};

