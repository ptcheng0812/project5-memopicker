import CompsLayout from '@/components/layouts/Layout'

export default function PagesMyThreads() {
  return (
    <CompsLayout>
      <div id="pages-my-threads" className="text-center">
        <div id="page-my-threads-pagination-btn" className="d-flex justify-content-around">
          {
            page > 1 && <button type="button" className="btn btn-info btn-spacing" id="page-my-threads-pagination-btn-btn" onClick={() => setPage(page - 1)}>Previous</button>
          }

          {
            true && <button type="button" className="btn btn-info" id="page-my-threads-pagination-btn-btn" onClick={() => setPage(page + 1)}>Load More</button>
          }
        </div>
      </div>
    </CompsLayout>
  )
}
