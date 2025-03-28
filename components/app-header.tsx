import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSelector } from "@/components/ui/theme-selector";
import React from "react";

interface AppHeaderProps {
    links: {
        title: string;
        url: string;
    }[];
}

const AppHeader: React.FC<AppHeaderProps> = ({ links }) => {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        {links.map((link, index) => (
                            <React.Fragment key={link.url}>
                                {index == links.length - 1 ? (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {link.title}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                ) : (
                                    <React.Fragment>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href={link.url}>
                                                {link.title}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="pr-4">
                <ThemeSelector />
            </div>
        </header>
    );
};

export default AppHeader;
