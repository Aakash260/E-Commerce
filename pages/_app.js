import React from 'react';
import Head from 'next/head';
import '../app/layout'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
 
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'
import { GoogleOAuthProvider } from '@react-oauth/google';
 import { Provider } from 'react-redux';
 import store from '@/Store';
export default function MyApp({ Component, pageProps }) {

    const [progress, setProgress] = useState(0)
    const [cart, setCart] = useState({})
    const [total, setTotal] = useState(0)
    const [user, setUser] = useState({ value: null })
   
    const router = useRouter()
 
    useEffect(() => {
        router.events.on('routeChangeComplete', () => {
            setProgress(100)
        })
        try {
            if (localStorage.getItem("cart")) {
                setCart(JSON.parse(localStorage.getItem("cart")))
                saveCart(JSON.parse(localStorage.getItem("cart")))

            }
        } catch (error) {
            localStorage.clear()
        }
        const myuser = JSON.parse(localStorage.getItem("myuser"))//bc json string krke save liya th 
        
        if (myuser) {
            setUser({ value: myuser.token,email:myuser.email,googleUser:myuser.googleUser })
        }
             
    }, [router.query])
 

    const saveCart = (myCart) => {
        localStorage.setItem('cart', JSON.stringify(myCart));
        let subt = 0;
        let keys = Object.keys(myCart)
        for (let i = 0; i < keys.length; i++) {
            subt += myCart[keys[i]].price * myCart[keys[i]].qty
        }
        setTotal(subt)
    }
    const addCart = (itemCode, qty, price, name, size, variant, img) => {

        let newCart = cart
        if (itemCode in cart) {
            newCart[itemCode].qty = cart[itemCode].qty + qty
        } else {
            newCart[itemCode] = { qty: 1, price, name, size, variant, img }
        }
        setCart(newCart)
        saveCart(newCart)

    }
    const BuyNow = (itemCode, qty, price, name, size, variant, img) => {
        let newCart={}
      newCart[itemCode]= { qty: 1, price, name, size, variant, img } 
        setCart(newCart)
        saveCart(newCart)
        router.push('/checkout')
    }

    const clearCart = () => {
        setCart({})
        saveCart({})
    }

    const removeCart = (itemCode, qty, price, name, size, variant, img) => {
        let newCart = cart
        if (itemCode in cart) {
            newCart[itemCode].qty = cart[itemCode].qty - qty
        }
        if (newCart[itemCode].qty <= 0) {
            delete newCart[itemCode]
        }
        setCart(newCart)
        saveCart(newCart)
    }
      
    const logout = () => {
        localStorage.removeItem('myuser')
        setUser({ value: null })
        

        router.push('/login')

        toast.info('Successfully logged out!', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
       

    }
    return <div>

        <Head>

            <link rel="icon" href="https://botw-pd.s3.amazonaws.com/onlineshopping.png" />
            <title>Theme Cloths</title>

        </Head>
        <LoadingBar
            color="#F44336"
            progress={progress}
            waitingTime={400}
            onLoaderFinished={() => setProgress(0)}
            height={3} />
            <GoogleOAuthProvider clientId="566646812308-9ms5jbi8muitgaeq5vkh6hg38a9hoqng.apps.googleusercontent.com">
           <Provider store={store}>
            <Navbar logout={logout}   user={user} addCart={addCart} removeCart={removeCart} clearCart={clearCart} cart={cart} total={total} /> {/*bcz key imidiatly call nhi hoga*/}
            
            <Component user={user}    BuyNow={BuyNow} addCart={addCart} removeCart={removeCart} clearCart={clearCart} cart={cart} total={total} {...pageProps} />
            <Footer logout={logout} user={user} />
            </Provider>
            </GoogleOAuthProvider>;
 
       
    </div>
}