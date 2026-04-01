export function Footer() {

    return (
        <footer className="w-full border-t border-border bg-background text-foreground">

            {/* Bottom bar */}
            <div className="fixed border-t border-border bg-background bottom-0 left-1/2 -translate-x-1/2 z-10 w-full px-6 py-4 lg:px-8">
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Task Manager Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;