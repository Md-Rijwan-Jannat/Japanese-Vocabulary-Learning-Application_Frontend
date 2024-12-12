import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.png'; // Update with the correct path to your logo

const Logo = () => {
  return (
    <Link href="/lessons" className="flex items-center gap-2">
      <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src={logo}
          alt="Logo"
          width={600}
          height={600}
          className="size-10 md:size-12 rounded-full"
        />
      </motion.div>
      <motion.div
        className="flex flex-col items-start"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xl md:text-2xl font-bold text-blue-500 leading-none tracking-wider">
          Learn
        </p>
        <motion.p
          className="text-lg md:text-xl font-semibold text-purple-500 leading-none tracking-widest"
          initial={{ scale: 0.9 }}
        >
          Japanese
        </motion.p>
      </motion.div>
    </Link>
  );
};

export default Logo;
