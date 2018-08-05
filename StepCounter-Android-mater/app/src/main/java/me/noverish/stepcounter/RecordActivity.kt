package me.noverish.stepcounter

import android.os.AsyncTask
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.Menu
import android.view.MenuItem
import android.view.ViewGroup
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_record.*
import me.noverish.stepcounter.utils.ServerClient
import me.noverish.stepcounter.utils.SharedPreferenceManager

class RecordActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_record)
        title = getString(R.string.activity_record_title)

        recycler_view.layoutManager = LinearLayoutManager(this@RecordActivity)

        object : AsyncTask<Void, Void, ArrayList<String>>() {
            override fun doInBackground(vararg voids: Void): ArrayList<String> {
                return ServerClient.receive()
            }

            override fun onPostExecute(result: ArrayList<String>) {
                super.onPostExecute(result)

                recycler_view.adapter = Adapter(result)
            }
        }.execute()
    }

    internal inner class Adapter(private val items: ArrayList<String>) : RecyclerView.Adapter<Adapter.Holder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
            val textView = TextView(this@RecordActivity)

            textView.setPadding(12, 12, 12, 0)
            textView.textSize = 16F

            return Holder(textView)
        }

        override fun onBindViewHolder(holder: Holder, position: Int) {
            val textView = holder.itemView as TextView
            textView.text = items[position]
        }

        override fun getItemCount(): Int {
            return items.size
        }

        internal inner class Holder(textView: TextView) : RecyclerView.ViewHolder(textView)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        val inflater = menuInflater
        inflater.inflate(R.menu.menu_records, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem?): Boolean {
        val menuItem = item ?: return super.onOptionsItemSelected(item)

        return when (menuItem.itemId) {
            R.id.clear -> {
                SharedPreferenceManager.clearRecords(this)
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}