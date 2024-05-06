import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/zh-cn';
import { getCategoryListLink, getTagListLink } from '@/common/utils';


dayjs.extend(localizedFormat)
dayjs.locale('zh-cn');

export interface IPostMetaProps {
  createdAt: Date;
  categories: string[];
}

export function CategoryLink(props: { name: string }) {
  return (
    <a href={getCategoryListLink(props.name)}>{props.name}</a>
  );
}

export function AuthorMeta(props: IPostMetaProps) {
  return (
    <div className="text-slate-400 text-sm mb-2">
      {dayjs(props.createdAt).format('LL')}
       发布在 {props.categories.map((category, index) => (
        <>
          {index > 0 && ', '}
          <CategoryLink name={category} />
        </>
      ))}
    </div>
  );
}

/**
 * TagButton component
 * `name` is the tag name
 * `type` is the url type of the tag, default to `link'
 * @param props 
 * @returns 
 */
export function TagButton(props: { name: string, type?: 'hash' | 'link' }) {
  const url = props.type === 'hash' ? `#${props.name}` : getTagListLink(props.name);
  return (
    <a className=" bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-1 rounded-full" href={url}>
      {props.name}
    </a>
  );
}

export function Divider(props: { children: React.ReactNode }) {
  return (
    <div className="relative flex justify-center py-4">
      <div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
      ></div>

      <span className="relative z-10 bg-white px-6 dark:bg-slate-800">{props.children}</span>
    </div>
  )
}