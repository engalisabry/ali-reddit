import { getAuthSession } from '@/lib/auth';

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  return (
    <div className="sm:conatiner max-w-7xl mx-auto h-full pt-12">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6 ">{children}</div>

          {/* info sidebar */}
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About r/{params.slug}</p>
              <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-zinc-500">
                    Your personal Ali Reddit homepage. Come here to check in
                    with your favorites communites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
