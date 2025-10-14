import { Metadata } from 'next';
import { PageLayout } from '@/components';

export const metadata: Metadata = {
  title: '關於我們 - 文化記憶庫',
  description: '了解文化記憶庫的使命與願景，致力於保存和傳承珍貴的文化遺產',
};

export default function AboutPage() {
  return (
    
    <PageLayout title="關於我們" subtitle="About Us"  headerpic="/images/header/about.jpeg">
      <div className="min-h-screen bg-gray-50">

      {/* 主要內容區域 */}
      <div className=" mx-auto px-10 sm:px-10 lg:px-30 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              我們的使命
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              文化記憶庫致力於成為台灣文化保存與傳承的重要平台，透過現代科技的力量，
              將珍貴的文化資產數位化保存，讓更多人能夠接觸、了解並傳承這些寶貴的文化遺產。
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              我們相信文化是人類智慧的結晶，每一個傳統、每一個故事都值得被記錄和傳承。
              透過這個平台，我們希望能夠橋接過去與現在，讓文化的記憶永續流傳。
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">核心價值</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-[#833416] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</span>
                <div>
                  <h4 className="font-semibold text-gray-900">文化保存</h4>
                  <p className="text-gray-600">致力於保護和記錄珍貴的文化遺產</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#833416] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</span>
                <div>
                  <h4 className="font-semibold text-gray-900">知識傳承</h4>
                  <p className="text-gray-600">將傳統智慧傳遞給下一代</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#833416] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</span>
                <div>
                  <h4 className="font-semibold text-gray-900">數位創新</h4>
                  <p className="text-gray-600">運用科技創新文化體驗方式</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
