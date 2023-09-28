'use client';
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { AnimatePresence, animate, motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import Link from 'next/link';
const projects = [
  {
    title: "C2 Montreal",
    src: "c2montreal.png",
    stack: "TECH STACK 1.REACT 2.TAILWINDCSS 3.REDUX 4.OUTH 5.STRIPE",
    Feature:"1.React redux state management 2.Outh authentication 3.React chart admin dashboard 4.Stripe Payment Gateway",
    color: "#000000",
    href:"https://madhyamecommercesite.netlify.app/",
    button:"View"
  
  },
  {
    title: "Office Studio",
    src: "officestudio.png",
    stack: "TECH STACK 1.HTML 2.CSS 3.JAVASCRIPT 4.GSAP 5.LOCOMOTIVE SCROLL",
    Feature:"1.Animation 2.Best User Interface 3.Smooth Scroll 4.Onscroll effects",
    color: "#8C8C8C",
    href:"https://madhyammachine.netlify.app/",
    button:"View"
  },
  {
    title: "Locomotive",
    src: "locomotive.png",
    color: "#EFE8D3",
    href:"https://madhyamecommercesite.netlify.app/",
    button:"View"
  },
  {
    title: "Silencio",
    src: "silencio.png",
    color: "#706D63",
    href:"https://madhyamecommercesite.netlify.app/",
    button:"View"
  }
]

const scaleAnimation = {
    initial: {scale: 0, x:"-50%", y:"-50%"},
    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

export default function Home() {

  const [modal, setModal] = useState({active: false, index: 0})
  const { active, index } = modal;

  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect( () => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
  }, [])

  const moveItems = (x, y) => {
    xMoveContainer.current(x)
    yMoveContainer.current(y)
    xMoveCursor.current(x)
    yMoveCursor.current(y)
    xMoveCursorLabel.current(x)
    yMoveCursorLabel.current(y)
  }
  const manageModal = (active, index, x, y) => {
    moveItems(x, y)
    setModal({active, index})
  }

  return (
  <main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} className={styles.projects}>
    <div className={styles.body}>
 
        
      
      <div>
      {
        projects.map( (project,  index) => {
          return <Link className={styles.name} href={project.href}><Project  href={project.href}  index={index} stack={project.stack} 
          Feature={project.Feature}
          title={project.title} manageModal={manageModal} key={index}  /></Link>
          
        })
      
      } 
      </div>
      <div>
      {
        projects.map( (project,  index) => {
          return <div className={styles.name} ><Project  href={project.href}  index={index} 
          title={project.title} button={project.button} manageModal={manageModal} key={index}  /></div>
          
        })
      
      } 
      </div>

    </div>
    <motion.div 
    >
    <Link  href='/project'>
    <Rounded>
      <p>More work</p>
    </Rounded>
    </Link>
    </motion.div>
    <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={styles.modalContainer}>
            <div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
            {
                projects.map( (project, index) => {
                const { src, color } = project
                return <div className={styles.modal} style={{backgroundColor: color}} key={`modal_${index}`}>
                    <Image 
                    src={`/images/${src}`}
                    width={300}
                    height={0}
                    alt="image"
                    />
                </div>
                })
            }
            </div>
        </motion.div>
        <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
        <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>View</motion.div>
    </>
  </main>
  )
}
