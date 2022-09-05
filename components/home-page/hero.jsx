import classes from './hero.module.css';
import Image from 'next/image';

function Hero() {
    return (
        <>
            <section className={classes.hero}>
                <div className={classes.image}>
                    <Image src="/images/site/7bb0d27e44d8c2eff47276ae86bfd6a3.png" alt='An image showing Aya' height="300" width="300"/>
                </div>
                <h1>Hi, I'm Aya</h1>
                <p>
                    I blog about web development - especially frontend frameworks like Next.js and React.js
                </p>
            </section>
        </>
    )
}

export default Hero;