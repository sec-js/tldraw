'use client'

import { SearchEntry, SearchIndexName, getSearchIndexName } from '@/utils/algolia'
import algoliasearch from 'algoliasearch/lite'
import { useRouter } from 'next/navigation'
import { InstantSearch, useHits, useSearchBox } from 'react-instantsearch'
import SearchAutocomplete from './SearchAutocomplete'

const searchClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
	process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
)

export function Search({ type, onClose }: { type: SearchIndexName; onClose(): void }) {
	return (
		<InstantSearch indexName={getSearchIndexName(type)} searchClient={searchClient}>
			<InstantSearchInner onClose={onClose} />
		</InstantSearch>
	)
}

function InstantSearchInner({ onClose }: { onClose(): void }) {
	const { items } = useHits<SearchEntry>()
	const { refine } = useSearchBox()
	const router = useRouter()

	const handleChange = (path: string) => {
		router.push(path)
		onClose()
	}

	return (
		<SearchAutocomplete
			items={items}
			onInputChange={(query: string) => refine(query)}
			onChange={handleChange}
			onClose={onClose}
		/>
	)
}
