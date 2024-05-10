import { FaFacebook } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { auth, signIn, signOut } from 'auth'
import { codeToHtml } from 'shiki'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
export default async function Page() {
  const session = await auth()
  return session ? (
    <div className='flex h-screen flex-col items-center justify-center gap-3'>
      Everything we know about you
      <div
        className='w-[40rem] overflow-auto rounded-lg bg-stone-800 p-3'
        dangerouslySetInnerHTML={{
          __html: await codeToHtml(JSON.stringify(session.user, null, 2), {
            lang: 'json',
            theme: 'monokai'
          })
        }}
      />
      <form
        action={async () => {
          'use server'
          await signOut()
        }}>
        <Button
          variant='secondary'
          className='fixed right-1 top-2 bg-red-100 drop-shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 hover:text-background hover:drop-shadow-lg'>
          Log out
        </Button>
      </form>
    </div>
  ) : (
    <div className='flex h-screen'>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className='m-auto drop-shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-green-100 hover:drop-shadow-lg'
            variant='outline'>
            Log in
          </Button>
        </DrawerTrigger>
        <DrawerContent className='mx-auto w-fit'>
          <p className='pt-3 text-center'>Continue with</p>
          <div className='flex gap-5 p-5'>
            <form
              action={async () => {
                'use server'
                await signIn('google')
              }}>
              <Button
                variant='outline'
                size='lg'
                className='group size-36 flex-col gap-1 rounded-2xl text-base drop-shadow-md transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg'>
                <FcGoogle className='size-16 transition-all duration-300' />
                <div className='transition-all duration-300 group-hover:tracking-wide'>Google</div>
              </Button>
            </form>
            <form
              action={async () => {
                'use server'
                await signIn('facebook')
              }}>
              <Button
                variant='outline'
                size='lg'
                className='group size-36 flex-col gap-1 rounded-2xl text-base drop-shadow-md transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg'>
                <FaFacebook className='size-16 scale-90 text-blue-600 transition-all duration-300' />
                <div className='transition-all duration-300 group-hover:tracking-wide'>
                  Facebook
                </div>
              </Button>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
