import { MapPin, Clock, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="LUCA Cafe Logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-xl font-display font-semibold tracking-wide text-foreground">
                LUCA <span className="italic font-medium text-accent">Cafe</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Speciality Italian and multi-cuisine culinary experiences. Crafted with passion, served in Swaroop Nagar, Kanpur.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Visit Us</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <span>Madhu Sudhan Tower, 113/115A, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <span>080762 21806</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Hours</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <div>
                <p>Tue – Sun: 11:00 AM – 12:00 Midnight</p>
                <p>Monday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} LUCA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
