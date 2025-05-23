import { motion, AnimatePresence } from 'motion/react'
import { useBottomBarStore } from '@/store/useBottombarStore'
import ProfileModal from '@/components/home-page/profile-modal/ProfileModal'
import TravelForm from '@/components/home-page/travel-form-modal/TravelFormLayout'

export default function ModalContainer() {
  const variants = {
    open: { y: 0, opacity: 1 },
    closed: { y: '100%', opacity: 0 },
  }
  const activeModal = useBottomBarStore((state) => state.activeModal)
  const startModalChange = useBottomBarStore((state) => state.startModalChange)
  const animationPhase = useBottomBarStore((state) => state.animationPhase)
  const closeAnimation = useBottomBarStore((state) => state.closeAnimation)
  const openAnimation = useBottomBarStore((state) => state.openAnimation)

  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed bottom-20 inset-0 z-10 h-full w-full flex items-end justify-center">
          <motion.div
            className="absolute inset-0 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => startModalChange(null)}
          />
          <motion.div
            className="relative h-[70%] mb-20 w-full"
            variants={variants}
            initial="closed"
            animate={
              animationPhase === 'opening'
                ? 'open'
                : animationPhase === 'closing'
                ? 'closed'
                : false
            }
            transition={{
              type: 'tween',
              duration: 0.2,
            }}
            onAnimationComplete={(definition) => {
              if (definition === 'closed') closeAnimation()
              if (definition === 'open') openAnimation()
            }}
          >
            {activeModal === 'travelForm' && <TravelForm />}
            {/* {activeModal === 'travelList' && <TravelListModal />} */}
            {activeModal === 'profile' && <ProfileModal />}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
