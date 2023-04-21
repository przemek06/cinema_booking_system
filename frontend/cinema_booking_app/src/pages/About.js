import "./Style.css";

const About = () => {
    return (
        <div className="body-container screenings-container">
            <h1>About</h1>
            <p>Silver Screen Cinema is a popular movie theater that offers a unique and immersive cinematic experience. The theater is located in a bustling neighborhood and features state-of-the-art facilities, including comfortable seating, advanced sound systems, and cutting-edge projection technology.

As you enter the lobby, you will be greeted by a friendly staff who will assist you with your tickets and snacks. The lobby is beautifully decorated with vintage movie posters and art deco furnishings, creating a sense of nostalgia and excitement.

Once you step into the theater, you will be transported into another world. The interior design is inspired by classic Hollywood glamour, featuring plush red velvet curtains, ornate chandeliers, and luxurious seating. The theater screens a wide range of movies, including the latest blockbusters, independent films, and classic favorites.

In addition to movie screenings, Silver Screen Cinema also hosts special events and film festivals. These events attract movie enthusiasts from all over the city and provide an opportunity to engage with filmmakers and fellow cinema lovers.

Overall, Silver Screen Cinema is a must-visit destination for anyone who loves movies and appreciates a unique and unforgettable movie-going experience.</p>
        <img style={{ width: '100%' }} src={require("../cinema_pic.png")} alt="Cinema Picture"/>
        </div>
    )
}

export default About