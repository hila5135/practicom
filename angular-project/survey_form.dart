import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class SurveyForm extends StatefulWidget {
  @override
  _SurveyFormState createState() => _SurveyFormState();
}

class _SurveyFormState extends State<SurveyForm> {
  final _formKey = GlobalKey<FormState>();
  String question = '';
  List<String> answers = ['', '', ''];

  void _submitSurvey() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      try {
        await FirebaseFirestore.instance.collection('surveys').add({
          'question': question,
          'answers': answers,
          'votes': List.generate(answers.length, (_) => 0),
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Survey saved successfully!')),
        );
        Navigator.pop(context);
      } catch (error) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error saving survey: $error')),
        );
      }
    }
  }

  Widget _buildTextField({
    required String hintText,
    required void Function(String?) onSaved,
    bool isBold = false,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 6,
            offset: Offset(0, 3),
          )
        ],
      ),
      child: TextFormField(
        textAlign: TextAlign.left,
        style: TextStyle(
          fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
          fontSize: 16,
          color: Colors.black87,
        ),
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: TextStyle(color: Colors.grey.shade500),
          contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          border: InputBorder.none,
        ),
        validator: (value) => (value == null || value.isEmpty) ? 'Required field' : null,
        onSaved: onSaved,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFFDF9FA),
      appBar: AppBar(
        title: Text(
          'Add Survey',
          style: TextStyle(
            color: Colors.black87,
            fontWeight: FontWeight.bold,
            fontSize: 20,
          ),
        ),
        centerTitle: true,
        backgroundColor: Color(0xFFFDF9FA),
        elevation: 0,
        iconTheme: IconThemeData(color: Colors.black87),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              _buildTextField(
                hintText: 'Question',
                onSaved: (value) => question = value!,
                isBold: true,
              ),
              Divider(height: 1, thickness: 1, color: Colors.grey.shade300),
              SizedBox(height: 16),
              for (int i = 0; i < answers.length; i++) ...[
                _buildTextField(
                  hintText: 'Option ${i + 1}',
                  onSaved: (value) => answers[i] = value!,
                ),
                SizedBox(height: 4),
              ],
              SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _submitSurvey,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFFFF5678),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    padding: EdgeInsets.symmetric(vertical: 16),
                    elevation: 4,
                  ),
                  child: Text(
                    'Add',
                    style: TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        color: Colors.white,
        elevation: 8,
        shape: CircularNotchedRectangle(),
        notchMargin: 8,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              IconButton(icon: Icon(Icons.home_outlined), onPressed: () {}),
              IconButton(icon: Icon(Icons.history_outlined), onPressed: () {}),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: Color(0xFFFF5678),
        child: Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}