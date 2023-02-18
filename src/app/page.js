'use client'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [postcode, setPostcode] = useState('')
  const [bedrooms, setBedrooms] = useState('1')
  const [res, setRes] = useState(null)

  const handleSearch = async () => {
    const res = await fetch(`/api/search?p=${encodeURIComponent(postcode)}&b=${encodeURIComponent(bedrooms)}`)
    const { json } = await res.json()

    if (json.status !== 'error') {
      setRes(json)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          UK rental value price trends.
        </p>
      </div>

      <div 
        className={styles.center}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div 
          className={styles.description}
          style={{
            maxWidth: '550px'
          }}>
          <p>
            Search for average rental property prices and price trends.
            <br/><br/>
            Search with a postcode or area name.
            <br/><br/>
            Completely free to use and we do not collect any data from you.
            <br />
          </p>
        </div>

        <div style={{position: 'relative', zIndex: 50}}>
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              handleSearch()
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              position: 'relative',
              gap: '1rem'
            }}
          >
            <select
              style={{
                padding: '1rem'
              }} 
              name="b"
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option value="1">1 bedroom</option>
              <option value="2">2 bedrooms</option>
              <option value="3">3 bedrooms</option>
              <option value="4">4 bedrooms</option>
              <option value="5">5 bedrooms</option>
            </select>

            <div style={{position: 'relative'}}>
              <input
                style={{
                  padding: '1rem',
                  paddingTop: '2rem',
                  width: '100%'
                }}
                type="text"
                name="p"
                defaultValue={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
              <label className={styles.code} style={{
                position: 'absolute',
                fontSize: '0.75rem',
                padding: '0.5rem',
                left: '0'

              }} htmlFor='p'>
                Search postcode
              </label>
            </div>
            <input
              type="submit"
              value='Search'
              style={{
                padding: '1rem'
              }}
            />
          </form>
        </div>

        {res && <div style={{padding: '2rem'}} className={styles.description}>
          <p>Bedrooms: {bedrooms}</p>
          <p>Average price(pw): &pound;{res?.data?.long_let?.average}</p>
          <p>Average price(pcm): &pound;{((res?.data?.long_let?.average*52)/12).toFixed(2)}</p>
        </div>}
      </div>

      <div style={{justifyContent: 'center'}} className={styles.description}>
        <p>
          Made by Laurence Hammond.
        </p>
      </div>
    </main>
  )
}
