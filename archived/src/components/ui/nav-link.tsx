import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";

const NavLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link>
>(({ ...props }, ref) => {
  return (
    <Button asChild variant="link">
      <Link {...props} ref={ref} />
    </Button>
  );
});
NavLink.displayName = "NavLink";

export { NavLink };
