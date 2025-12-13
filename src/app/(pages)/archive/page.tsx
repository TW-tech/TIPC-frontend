// 典藏索引
"use client";
import { useState } from "react";
import { PageLayout, ArchiveCard, ArchiveFilter } from '@/components';
import archivesData from '@/data/archive.json';
import { Archive } from '@/types';

export default function ArchivePage() {
    const archives: Archive[] = archivesData as Archive[];
    const loading = false;
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    // 篩選資料
    const filteredArchives = activeFilter 
        ? archives.filter(archive => archive.Class === activeFilter)
        : archives;

    const handleFilterChange = (filter: string | null) => {
        setActiveFilter(filter);
    };

    return (
         <PageLayout title="典藏索引" subtitle="Database Index on Taiwan" headerpic="/images/header/archive.jpeg">
            
            <div className="flex justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6"> 
                <ArchiveFilter 
                    onFilterChange={handleFilterChange}
                    activeFilter={activeFilter}
                />
            </div>

            

            {/* 主要內容區域 */}
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full text-center text-gray-500">Loading...</div>
                    ) : filteredArchives.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">沒有找到符合的資料</div>
                    ) : (
                        filteredArchives.map((item) => (
                            <ArchiveCard
                                key={item.id}
                                id={item.id}
                                webName={item.WebName}
                                tag={item.Class}
                                orgName={item.OrgName}
                                orgWebLink={item.OrgWebLink}
                            />
                        ))
                    )}
                </div>
            </div>
        </PageLayout>
    );
}