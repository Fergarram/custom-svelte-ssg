<h2>Who is Fernando?</h2>

<div class="two-col">
    <div class="left">
        <p>Hey, I’m a <strong>frontend developer</strong> and <strong>ui designer</strong> based in <i>planet earth.</i></p>
        <p>I’m currently working with <a href="http://blacksmith.agency/" target="_blank" rel="no-follow">Blacksmith Agency</a> coding some cool-ass websites.</p>
        <p>(Don’t tell Dave I said “cool-ass”).</p>
    </div>
    <figure class="right">
        <img src="../assets/fer.jpg" alt="">
        <figcaption>
            Photo of Fernando wearing a white t-shirt and a white cap.
        </figcaption>
    </figure>
</div>

<p class="last-paragraph">
    Find out more about me or contact me through the following:
</p>

<ul>
    <li>
        <a href="/social">social media 🌍</a>
    </li>
    <li>
        <a href="/contact">e-mail 📬</a>
    </li>
</ul>

<style lang="scss">
@import '../styles/variables.scss';

.last-paragraph {
    margin-top: 10px;
    margin-bottom: 5px;
}

.two-col {
    display: flex;
}

.left {
    margin-right: 20px;
}

.right {
    min-width: 160px;
    max-width: 160px;
}

p, ul {
    font-size: 17px;
    text-align: justify;
    font-family: $font-times;
}

ul {
    list-style-position: inside;
    line-height: 1.3;
}

h2 {
    margin-top: 8px;
    margin-bottom: 32px;
    font-family: $font-playfair;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -1.2px;
    text-transform: uppercase;
}

img {
    cursor: zoom-in;
    border: 1px solid black;
    border-radius: 2px;
}

figcaption {
    margin-top: 8px;
    font-size: 12px;
}
</style>