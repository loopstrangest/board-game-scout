import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Europa', sans-serif;
}
html{
    &::-webkit-scrollbar{
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
        background-color: darkgrey;
    }
}
body{
    width: 100%;
}
h1{
    text-align: center;
    font-size: 3rem;
    padding-top: 1rem;
}
h2{
    font-size: 2rem;
}
h3{
    font-size: 1.3rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
p{
    font-size: 1.2rem;
}
a{
    text-decoration: none;
}
`;

export default GlobalStyles;
