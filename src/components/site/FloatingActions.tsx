import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-center gap-3">
      <AnimatePresence mode="popLayout">
        {showScrollTop && (
          <motion.button
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            aria-label={t("floating.scrollTop")}
            className="grid size-11 cursor-pointer place-items-center rounded-xs bg-walnut text-white shadow-soft"
          >
            <ArrowUp className="size-5" strokeWidth={1.8} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        layout
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <Link
          to="/contact"
          className="grid size-11 place-items-center rounded-xs bg-white text-walnut shadow-soft ring-1 ring-walnut/10 transition-colors duration-300 hover:bg-walnut hover:text-white hover:ring-walnut"
          aria-label={t("floating.contact")}
        >
          <MessageCircle className="size-5" strokeWidth={1.8} />
        </Link>
      </motion.div>
    </div>
  );
}
